const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = 'https://static.wixstatic.com/media/';

const images = {
  'misc': [
    { file: 'artist-photo.jpg', id: 'a85beb_2125671b909942828b1a0fb922d3547c~mv2.jpg' },
  ],
  'coloured-pencil': [
    { file: 'cp-01.jpg', id: 'a85beb_620d15dcd78243c5b45e6ad56ef365d1~mv2.jpg' },
    { file: 'cp-02.jpg', id: 'a85beb_9c38c2dbf98a4f3783c0186f94f79c56~mv2.jpg' },
    { file: 'cp-03.jpg', id: 'a85beb_0098e2203ef14cf1a79305575ad296b1~mv2.jpg' },
    { file: 'cp-04.jpg', id: 'a85beb_6dc23822deff4983b97d0f271ee44765~mv2.jpg' },
    { file: 'cp-05.jpg', id: 'a85beb_5754e88361234d3d9108f2008a844068~mv2.jpg' },
    { file: 'cp-06.jpg', id: 'a85beb_eb8db0cd487d42beb7e458b0f9a70600~mv2.jpg' },
    { file: 'cp-07.jpg', id: 'a85beb_06fd658cc9464a5dad077843672734f6~mv2.jpg' },
    { file: 'cp-08.jpg', id: 'a85beb_0ff19b60524f40989f0f02b213a31ba1~mv2.jpg' },
    { file: 'cp-09.jpg', id: 'a85beb_84bedacd4ae9481f847796a888b85fc2~mv2.jpg' },
    { file: 'cp-10.jpg', id: 'a85beb_dcf6481693674b009d0520d1c9b1d87c~mv2.jpg' },
    { file: 'cp-11.jpg', id: 'a85beb_4b54600b0e0c43b78c3761dc0fe61ae0~mv2.jpg' },
    { file: 'cp-12.jpg', id: 'a85beb_648aa26f80544f17bc7919dc791c02ac~mv2.jpg' },
    { file: 'cp-13.jpg', id: 'a85beb_4062f74a911a4d7aafa0b0f9aaaf7451~mv2.jpg' },
    { file: 'cp-14.jpg', id: 'a85beb_ac74f4d6b137470ea4377ef17be95d83~mv2.jpg' },
    { file: 'cp-15.jpg', id: 'a85beb_66204a4185d2427682209a616f52b998~mv2.jpg' },
    { file: 'cp-16.jpg', id: 'a85beb_886c2e94befe4baa980621e8f86ff2d6~mv2.jpg' },
    { file: 'cp-17.jpg', id: 'a85beb_19e3e7616d0d4cd2bf04552808bae59d~mv2.jpg' },
    { file: 'cp-18.jpg', id: 'a85beb_49349009231e40cbadfb65ec33d258c2~mv2.jpg' },
    { file: 'cp-19.jpg', id: 'a85beb_7d50845aafd94a89ada8bd638a5efaa5~mv2.jpg' },
    { file: 'cp-20.jpg', id: 'a85beb_496fc18230874b66a5f3d443ae4c6a0c~mv2.jpg' },
    { file: 'cp-21.jpg', id: 'a85beb_b01ab1e545bc481ab9dbec8405652970~mv2.jpg' },
    { file: 'cp-22.jpg', id: 'a85beb_986737b2a767480ebd5083abde60f0a6~mv2.jpg' },
    { file: 'cp-23.jpg', id: 'a85beb_7443d9a0d754487b9e0bd39557f05431~mv2.jpg' },
    { file: 'cp-24.jpg', id: 'a85beb_4d3329d45bc54d52a412813486679393~mv2.jpg' },
    { file: 'cp-25.jpg', id: 'a85beb_7260205566bb480a908c9eae67e15c5c~mv2.jpg' },
    { file: 'cp-26.jpg', id: 'a85beb_87f94be179364b4ab14b724393cd9351~mv2.jpg' },
  ],
  'watercolour': [
    { file: 'wc-01.jpg', id: 'a85beb_70df13de647740129e0c9eeef15d27d6~mv2.jpg' },
    { file: 'wc-02.jpg', id: 'a85beb_e23dcbc8f5b94480976b76a3dc949b24~mv2.jpg' },
    { file: 'wc-03.jpg', id: 'a85beb_0db6e51f9b55476798dbb0db8dcd7299~mv2.jpg' },
    { file: 'wc-04.jpg', id: 'a85beb_d8eea50dedfd4a768b2f722f99b0c2d6~mv2.jpg' },
  ],
  'acrylic-oil': [
    { file: 'ao-01.jpg', id: 'a85beb_2419d657683f47d28ade05fa008e1e77~mv2.jpg' },
    { file: 'ao-02.jpg', id: 'a85beb_66cfb63d76de4b85b9004f2e6c04ff2b~mv2.jpg' },
    { file: 'ao-03.jpg', id: 'a85beb_f1cfce49398f45b28c1fbc373e86be3b~mv2.jpg' },
    { file: 'ao-04.jpg', id: 'a85beb_cf7f1fd4a2e446a7adce8328dbdfe3cf~mv2.jpg' },
    { file: 'ao-05.jpg', id: 'a85beb_e073ebc3d6e7467f9946c5fbea394b5c~mv2.jpg' },
    { file: 'ao-06.jpg', id: 'a85beb_1031d8495715402bbac7bb928cce631c~mv2.jpg' },
    { file: 'ao-07.jpg', id: 'a85beb_8a147632771b4544bdbc99103c9923a1~mv2.jpg' },
    { file: 'ao-08.jpg', id: 'a85beb_1fc9a8f988c94fac8ff311644a0b2b32~mv2.jpg' },
  ],
  'blog': [
    { file: 'blog-retired-coble-boat.jpg', id: 'a85beb_9e8465bd275142ac96fec01241a4eb2a~mv2.jpg' },
    { file: 'blog-zebras-contd.jpg', id: 'a85beb_a76585240fbe45e286e3a8ce53e51041~mv2.jpg' },
    { file: 'blog-onward-upward.png', id: 'a85beb_cf44abcb8a0543148b5ed228bc2dd2bf~mv2.png' },
    { file: 'blog-let-there-be-lights-completed.jpg', id: 'a85beb_fe6c987840174fd4bdf14df91e2ee3d4~mv2.jpg' },
    { file: 'blog-let-there-be-lights-contd.jpg', id: 'a85beb_11e5f53e9507481194e2e96bbf7ed335~mv2.jpg' },
    { file: 'blog-let-there-be-lights-contd-2.jpg', id: 'a85beb_fdc60bce815f40199210b9cc79f693cd~mv2.jpg' },
    { file: 'blog-let-there-be-lights.jpg', id: 'a85beb_899f2be26abe43ffa53593257f281bbc~mv2.jpg' },
    { file: 'blog-55-chevy-contd.jpg', id: 'a85beb_50c42ec0cc344f5eadefddfb27b063c6~mv2.jpg' },
    { file: 'blog-55-chevy.jpg', id: 'a85beb_8300312d1be3408abe278fb28bf9cee5~mv2.jpg' },
    { file: 'blog-out-to-pasture-completed.jpg', id: 'a85beb_30607fc1a81e4029b00042b39213de39~mv2.jpg' },
    { file: 'blog-out-to-pasture-wip.jpg', id: 'a85beb_fc10cfd9c6384222a75136c7cce605af~mv2.jpg' },
    { file: 'blog-cabbage-soup-done.jpg', id: 'a85beb_c205d03e1e7743468632df8cab755fb1~mv2.jpg' },
    { file: 'blog-monochromatic-peony-pure.jpg', id: 'a85beb_e073ebc3d6e7467f9946c5fbea394b5c~mv2.jpg' },
    { file: 'blog-monochromatic-peony-day4.jpg', id: 'a85beb_70f0855e35c743a8b2f651c8256fde36~mv2.jpg' },
    { file: 'blog-monochromatic-peony-start.jpg', id: 'a85beb_36d131189ea24343b900ac96bc3c74f3~mv2.jpg' },
    { file: 'blog-peek-a-boo-finished.jpg', id: 'a85beb_8f79bf5d5a4a497784338ebfc53a6ef0~mv2.jpg' },
    { file: 'blog-peek-a-boo-contd.jpg', id: 'a85beb_6c054e0bccb54a4a856b6de979683549~mv2.jpg' },
    { file: 'blog-peek-a-boo.jpg', id: 'a85beb_19eb7b6b6f7e4313b4a6b2aa563fcdc9~mv2.jpg' },
    { file: 'blog-coloured-pencils-more.jpg', id: 'a85beb_92cbfd446d0543b2a345276d2dd2bf62~mv2.jpg' },
  ],
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`  SKIP ${dest} (exists)`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`  OK   ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  const baseDir = path.join(__dirname, '..', 'public', 'images');

  for (const [category, items] of Object.entries(images)) {
    const dir = path.join(baseDir, category);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`\nDownloading ${category} (${items.length} images)...`);

    // Download 3 at a time to avoid overwhelming the server
    for (let i = 0; i < items.length; i += 3) {
      const batch = items.slice(i, i + 3);
      await Promise.all(
        batch.map(({ file, id }) => {
          const url = BASE + id;
          const dest = path.join(dir, file);
          return download(url, dest).catch(err => {
            console.error(`  FAIL ${file}: ${err.message}`);
          });
        })
      );
    }
  }

  console.log('\nDone!');
}

main();
