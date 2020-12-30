const Koa = require('koa');
const Router = require("koa-router");

const axios = require('axios').default;

const app = new Koa();
const router = new Router();


// Get skins
router.get('/MinecraftSkins/:player', async ctx => {
  console.log('SKIN: ' + ctx.params['player']);
  const uuid = await getUUID(ctx.params['player']);
  const profileData = await getProfileData(uuid);

  if (profileData) {
    ctx.redirect(profileData.textures.SKIN.url, 302);
  } else {
    ctx.status(400);
  }
});

// Get capes
router.get('/MinecraftCloaks/:player', async ctx => {
  console.log('CAPE: ' + ctx.params['player']);
  const uuid = await getUUID(ctx.params['player']);
  const profileData = await getProfileData(uuid);

  if (profileData) {
    ctx.redirect(profileData.textures.CAPE.url, 302);
  } else {
    ctx.status(400);
  }
});

const getUUID = async (player) => {
  // Check length of player string
  if (!player.length) return null;
  if (player.includes('.png')) player = player.replace('.png', '');

  const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${player}`);

  if (response.data) return response.data.id;
  else return null;
};

const getProfileData = async (uuid) => {
  // Check length of player string
  if (!uuid.length) return null;

  const response = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);

  // Let's see if we get a response for that UUID
  if (!response.data) return null;

  // Decode into something we can use
  let decodedData = null;

  try {
    decodedData = JSON.parse(base64decode(response.data.properties[0].value));
  } catch (err) {
    console.log('err', err);
    return null;
  }

  return decodedData;
};

const base64decode = (encodedString) => {
  let data = encodedString;
  let buff = new Buffer(data, 'base64');

  return buff.toString('ascii');
}

app.use(router.routes());
app.listen(80, data => console.log(data));