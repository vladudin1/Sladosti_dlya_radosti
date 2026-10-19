<template>
  <div class="flavors-container">
    <h1>НАЧИНКИ И ЦЕНЫ</h1><br>

    <h2 class="subheading">Начинки тортов:</h2><br>
    <p v-if="loading">Загрузка фотографий...</p>

    <div v-if="!loading && fillings.length" class="photo-grid">
      <div v-for="photo in fillings" :key="photo.id" class="photo-item">
        <img :src="photo.sizes[photo.sizes.length - 2].url" :alt="photo.text">
        <p class="photo-caption" v-html="formatCaption(photo.text)"></p>
      </div>
    </div>

    <p v-else-if="!loading && !fillings.length">Нет доступных фотографий начинок.</p>

    <br><h2 class="subheading">Десерты:</h2><br>
    <p v-if="loadingDesserts">Загрузка десертов...</p>

    <div v-if="!loadingDesserts && desserts.length" class="photo-grid">
      <div v-for="photo in desserts" :key="photo.id" class="photo-item">
        <img :src="photo.sizes[photo.sizes.length - 2].url" :alt="photo.text">
        <p class="photo-caption" v-html="formatCaption(photo.text)"></p>
      </div>
    </div>

    <p v-else-if="!loadingDesserts && !desserts.length">Нет доступных фотографий десертов.</p>
  </div>
</template>

<script>
export default {
  name: 'FlavorsAndPrices',
  data() {
    return {
      fillings: [],
      desserts: [],
      loading: true,
      loadingDesserts: true,
      groupId: -177235808,
      fillingsAlbumId: 266619723, // Начинки
      dessertsAlbumId: 306667658, // Десерты
      accessToken: '96941a6296941a6296941a62c195b8f7ae9969496941a62f14c72a3017bbb4becdf0633'
    };
  },
  mounted() {
    this.fetchPhotos(this.fillingsAlbumId, 'fillings');
    this.fetchPhotos(this.dessertsAlbumId, 'desserts');
  },
  methods: {
    fetchPhotos(albumId, type) {
      window[`callbackPhotos${albumId}`] = (response) => {
        if (response.response && response.response.items) {
          if (type === 'fillings') {
            this.fillings = response.response.items;
            this.loading = false;
          } else if (type === 'desserts') {
            this.desserts = response.response.items;
            this.loadingDesserts = false;
          }
        }
      };

      const script = document.createElement('script');
      script.src = `https://api.vk.com/method/photos.get?v=5.131&owner_id=${this.groupId}&album_id=${albumId}&count=1000&access_token=${this.accessToken}&callback=callbackPhotos${albumId}`;
      document.body.appendChild(script);
    },

    formatCaption(text) {
      if (!text) return 'Без подписи';
      return text.replace(/(.+?\/кг)(.*)/, '<b>$1</b><br><span class="gray-text">$2</span>');
    }
  }
};
</script>

<style scoped>
.flavors-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-top: 0;
}

.subheading {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  color: #444;
  text-align: left;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
}

.photo-item {
  text-align: center;
}

.photo-item img {
  width: 100%;
  max-width: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.photo-caption {
  margin-top: 8px;
  font-size: 16px;
}

.bold-text {
  font-weight: bold;
  color: #000;
}

.gray-text {
  color: #666;
}
</style>
