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

    const file = files[0]
    const uuid = '12345'
    const filename = encodeURIComponent(`${uuid}/${file.name}`)
    const res = await fetch(`/api/upload/${filename}`)
    const { url, fields } = await res.json()
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    console.log(`${url}${filename}`, upload)
    if (upload.ok) {
      console.log('upload success')
    } else {
      console.error('upload failed')
    }
  };


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

  <br />

  <input type="button" on:click={login} value="LOGIN" disabled>
  <form action="/api/createBucket">
    <input type="submit" value="Create Bucket!" disabled>
  </form>
  <form on:submit|preventDefault={()=>handleSubmit()} enctype="multipart/form-data">
    <!-- <form action="/api/upload" method="post" enctype="multipart/form-data"> -->
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