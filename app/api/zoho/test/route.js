// app/api/users/route.js
export async function GET(request) {
    // Sample user data
    const sampleUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "user",
      },
      {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "editor",
      },
    ];
  
    // Return the sample data as a JSON response
    return new Response(JSON.stringify(sampleUsers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  