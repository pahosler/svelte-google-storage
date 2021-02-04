<script>
  import { onMount } from "svelte";
  import { createClient } from "@supabase/supabase-js";
  export let date, bucket_name, files;

  const supabase = createClient(
    "https://ptztwgipskartuvfjwna.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMTU5Mzk0NiwiZXhwIjoxOTI3MTY5OTQ2fQ.CGoDIFG5K9DV1TnF31i_Ttc-lIHxvvPuJF25joyB3II"
  )
  const login = async () => {
    const { user, error } = await supabase.auth.signIn({
      // provider can be 'github', 'google', 'gitlab', or 'bitbucket'
      provider: 'github'
    })

    if (error) {
      console.error(error)
    }

    console.log(user)
  }

  const handleSubmit = async (e) => {
    const file = e.target.firstChild.files[0];
    const filename = encodeURIComponent(file.name)
    console.log(file.name);
    const formData = new FormData();

    Object.entries({ filename, ...file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log("the file", formData)
    const res = await fetch(`/api/upload/file`, { method: 'POST', body: file });
    const data = await res;
    console.log("data: ", data)
  }

  onMount(async () => {
    const res = await fetch("/api/date");
    const data = await res.json();
    const thing = await fetch("/api/name/Fred")
    const thingd = await thing.json()
    console.log(thingd)
    date = data.date;
    bucket_name = data.bucket_name;
  });

</script>

<main>
  <h1>Svelte + Node.js API</h1>
  <h2>
    Deployed with
    <a href="https://vercel.com/docs" target="_blank" rel="noreferrer noopener">
      Vercel
    </a>
    !
  </h2>
  <p>
    <a href="https://github.com/vercel/vercel/tree/master/examples/svelte" target="_blank" rel="noreferrer noopener">
      This project
    </a>
    is a
    <a href="https://svelte.dev/">Svelte</a>
    app with three directories,
    <code>/public</code>
    for static assets,
    <code>/src</code>
    for components and content, and
    <code>/api</code>
    which contains a serverless
    <a href="https://nodejs.org/en/">Node.js</a>
    function. See
    <a href="/api/date">
      <code>api/date</code>
      for the Date API with Node.js
    </a>
    .
  </p>
  <br />
  <h2>The date according to Node.js is:</h2>
  <p>{date ? date : 'Loading date...'}</p>
  <p>{bucket_name ? bucket_name : 'nope'}</p>
  <input type="button" on:click={login} value="LOGIN">
  <form action="/api/createBucket">
    <input type="submit" value="Create Bucket!">
  </form>
  <!-- <form on:submit|preventDefault={(e)=>handleSubmit(e)} enctype="multipart/form-data"> -->
  <form action={`/api/upload/${files}`} method="post" enctype="multipart/form-data">
    <input type="file" name="file" accept="image/*" capture bind:files>
    {#if files && files[0]}
    <input type="submit" value="Upload Image" name="submit">
    {/if}
  </form>
  {#if files && files[0]}
  <!-- <p>
    {files[0].name}
  </p> -->
  <figure>
    <img src={URL.createObjectURL(files[0])} width=100 height=100 alt="thing" />
    <figcaption>{files[0].name}</figcaption>
  </figure>
  {/if}
</main>