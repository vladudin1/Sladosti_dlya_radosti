<template>
  <div class="portfolio">
    <h1>МОЕ ПОРТФОЛИО</h1>
    <!-- Вступительный текст -->
    <p class="intro">
     <i>Добро пожаловать!<br>
       Это портфолио, где представлены мои работы.<br> Ознакомьтесь с представленными проектами, <br> чтобы узнать больше о том, что я делаю.</i>
    </p>

    <!-- Если альбомы загружаются -->
    <p v-if="loading">Загрузка альбомов...</p>

    <!-- Список альбомов -->
    <div v-if="!loading && filteredAlbums.length && !selectedAlbumPhotos.length" class="albums">
      <div v-for="album in filteredAlbums" :key="album.id" class="album" @click="openAlbum(album.id)">
        <img :src="getHighQualityCover(album)" :alt="album.title" class="album-cover">
        <p>{{ album.title }}</p>
      </div>
    </div>

    <p v-else-if="!loading && filteredAlbums.length === 0">У группы нет альбомов.</p>

    <!-- Фотографии из альбома -->
    <div v-if="selectedAlbumPhotos.length" class="photos">
      <button @click="closeAlbum" class="back-btn">Назад к альбомам</button>
      <div class="photo-grid">
        <img v-for="(photo, index) in selectedAlbumPhotos"
             :key="photo.id"
             :src="photo.sizes[photo.sizes.length - 2].url"
             class="photo"
             @click="openPhoto(index)">
      </div>
    </div>

    <!-- Модальное окно с увеличенной фотографией и кнопками -->
    <div v-if="fullSizePhoto !== null" class="modal" @click.self="closePhoto">
      <button class="nav-btn left" @click.stop="prevPhoto">‹</button>
      <img :src="selectedAlbumPhotos[fullSizePhoto].sizes[selectedAlbumPhotos[fullSizePhoto].sizes.length - 1].url" class="modal-content">
      <button class="nav-btn right" @click.stop="nextPhoto">›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      albums: [],
      selectedAlbumPhotos: [],
      fullSizePhoto: null,
      loading: true,
      groupId: -177235808, // ID вашей группы
      accessToken: '96941a6296941a6296941a62c195b8f7ae9969496941a62f14c72a3017bbb4becdf0633' // Публичный токен доступа
    };
  },
  computed: {
    filteredAlbums() {
      return this.albums.filter(album => album.id !== 266619723 && album.id !== 306667658);
    }
  },
  mounted() {
    this.fetchAlbums();
  },
  methods: {
    fetchAlbums() {
      window.callbackAlbums = (response) => {
        if (response.response && response.response.items) {
          this.albums = response.response.items;
        }
        this.loading = false;
      };

      const script = document.createElement('script');
      script.src = `https://api.vk.com/method/photos.getAlbums?v=5.131&owner_id=${this.groupId}&need_covers=1&access_token=${this.accessToken}&callback=callbackAlbums`;
      document.body.appendChild(script);
    },

    getHighQualityCover(album) {
      return album.sizes ? album.sizes[album.sizes.length - 1].url : album.thumb_src;
    },

    openAlbum(albumId) {
      this.selectedAlbumPhotos = [];
      window.callbackPhotos = (response) => {
        if (response.response && response.response.items) {
          this.selectedAlbumPhotos = response.response.items;
        }
      };

      const script = document.createElement('script');
      script.src = `https://api.vk.com/method/photos.get?v=5.131&owner_id=${this.groupId}&album_id=${albumId}&count=400&access_token=${this.accessToken}&callback=callbackPhotos`;
      document.body.appendChild(script);
    },

    closeAlbum() {
      this.selectedAlbumPhotos = [];
      this.fullSizePhoto = null;
    },

    openPhoto(index) {
      this.fullSizePhoto = index;
    },

    closePhoto() {
      this.fullSizePhoto = null;
    },

    prevPhoto() {
      this.fullSizePhoto = (this.fullSizePhoto > 0) ? this.fullSizePhoto - 1 : this.selectedAlbumPhotos.length - 1;
    },

    nextPhoto() {
      this.fullSizePhoto = (this.fullSizePhoto < this.selectedAlbumPhotos.length - 1) ? this.fullSizePhoto + 1 : 0;
    }
  }
};
</script>

<style scoped>
.portfolio {
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  font-family: Tahoma;
  text-align: center;
  padding: 20px;
}

.intro {
  color: #666;
  font-family: Tahoma;
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.5;
}

/* Альбомы */
.albums {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.album {
  text-align: center;
  width: 250px;
  cursor: pointer;
}

.album-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.album-cover:hover {
  transform: scale(1.05);
}

/* Фотографии */
.photos {
  margin-top: 20px;
  text-align: center;
}

.back-btn {
  background: #ff9999;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.photo {
  width: 250px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.photo:hover {
  transform: scale(1.1);
}

/* Модальное окно */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}

/* Кнопки навигации */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 10px 15px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
}

.nav-btn.left {
  left: 10px;
}

.nav-btn.right {
  right: 10px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 1);
}


</style>
