
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
    const { email, name } = await req.json();
    console.log('Attempting to subscribe:', { email, name });
    console.log('Using AC API URL:', AC_API_URL);
    console.log('List name:', AC_LIST_NAME);

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
          firstName: name,
        },
      }),
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.text();
      console.error('Contact creation failed:', errorData);
      throw new Error('Failed to create contact: ' + errorData);
    }

    const contactData = await contactResponse.json();
    console.log('Contact created/updated:', contactData);
    const contactId = contactData.contact.id;

    // Get the list ID by name
    const listsResponse = await fetch(`${AC_API_URL}/api/3/lists?filters[name]=${encodeURIComponent(AC_LIST_NAME)}`, {
      headers: {
        'Api-Token': AC_API_KEY,
      },
    });

    if (!listsResponse.ok) {
      const errorData = await listsResponse.text();
      console.error('Lists fetch failed:', errorData);
      throw new Error('Failed to fetch lists: ' + errorData);
    }

    const listsData = await listsResponse.json();
    console.log('Lists response:', listsData);
    
    if (!listsData.lists?.length) {
      throw new Error(`List "${AC_LIST_NAME}" not found`);
    }

    const listId = listsData.lists[0].id;
    console.log('Found list ID:', listId);

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
      const errorData = await addToListResponse.text();
      console.error('Adding to list failed:', errorData);
      throw new Error('Failed to add contact to list: ' + errorData);
    }

    const addToListData = await addToListResponse.json();
    console.log('Successfully added to list:', addToListData);

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
