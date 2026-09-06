import { DGEGClient } from './index';

async function run() {
  const client = new DGEGClient();
  const districts = await client.getDistricts();

  console.log(`${districts.length} districts found:\n`, districts);
}

run();
