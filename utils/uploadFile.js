import { getArrayBufferForBlob } from "react-native-blob-jsi-helper";

import { getStorageActor } from "../src/actor";

const uploadChunk = ({ batch_name, chunk }) =>
  getStorageActor().create_chunk({
    batch_name,
    content: [...getArrayBufferForBlob(chunk)],
  });

const uploadFile = async (batch_name, blob_file) => {
  const promises = [];
  const chunkSize = 500000;

  for (let start = 0; start < blob_file.size; start += chunkSize) {
    const chunk = blob_file.slice(start, start + chunkSize);

    promises.push(
      uploadChunk({
        batch_name,
        chunk,
      })
    );
  }

  const chunkIds = await Promise.all(promises);

  await getStorageActor().commit_batch({
    batch_name,
    chunk_ids: chunkIds.map(({ chunk_id }) => chunk_id),
    content_type: blob_file.type,
  });

  return batch_name;
};

export default uploadFile;
