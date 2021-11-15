const API_URL = "http://localhost:8000/v1"
async function httpGetPlanets() {
   const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  return await response.json();
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`,{
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch)
    });
  } catch (error) {
    return {
      ok: false
    };
  }

}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id }`,{
      method: 'delete'
    });
  } catch (error) {
    return {
      ok: false
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};