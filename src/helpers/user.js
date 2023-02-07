export async function uploadUserImage(supabase,userId,file,bucket,column) {
    return new Promise(async (resolve) => {
      const newName = Date.now() + file.name;
      const {data,error} = await supabase.storage
        .from(bucket)
        .upload(newName, file);

      if (data) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL + `/storage/v1/object/public/${bucket}/` + data.path;
        supabase.from('profiles')
          .update({
            [column]: url,
          })
          .eq('id', userId)
          .then(res => {
            if (!res.error) {
              resolve();
            } else {
              throw res.error;
            }
          });
      }
      if (error) throw error;
    });
  }