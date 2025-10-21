exports.handler = async (event) => {
  try {
    const path = event.queryStringParameters.path;

    if (!path) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing path parameter" }),
      };
    }

    const url = `https://api.themoviedb.org/3/${path}`;
    console.log("Fetching TMDB URL:", url);

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    });

    // Log if TMDB returned an error
    if (!response.ok) {
      const text = await response.text();
      console.error("TMDB API Error:", response.status, text);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "TMDB API Error", details: text }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Server Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
