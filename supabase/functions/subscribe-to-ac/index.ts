
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const AC_API_URL = Deno.env.get('AC_API_URL');
const AC_API_KEY = Deno.env.get('AC_API_KEY');
const AC_LIST_NAME = Deno.env.get('AC_LIST_NAME');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    // First, create or update the contact
    const contactResponse = await fetch(`${AC_API_URL}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email: email,
        },
      }),
    });

    if (!contactResponse.ok) {
      throw new Error('Failed to create contact');
    }

    const contactData = await contactResponse.json();
    const contactId = contactData.contact.id;

    // Get the list ID by name
    const listsResponse = await fetch(`${AC_API_URL}/api/3/lists?filters[name]=${AC_LIST_NAME}`, {
      headers: {
        'Api-Token': AC_API_KEY,
      },
    });

    if (!listsResponse.ok) {
      throw new Error('Failed to fetch lists');
    }

    const listsData = await listsResponse.json();
    if (!listsData.lists?.length) {
      throw new Error(`List "${AC_LIST_NAME}" not found`);
    }

    const listId = listsData.lists[0].id;

    // Add contact to the list
    const addToListResponse = await fetch(`${AC_API_URL}/api/3/contactLists`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactList: {
          list: listId,
          contact: contactId,
          status: 1,
        },
      }),
    });

    if (!addToListResponse.ok) {
      throw new Error('Failed to add contact to list');
    }

    console.log(`Successfully added ${email} to Active Campaign list "${AC_LIST_NAME}"`);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in subscribe-to-ac function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
