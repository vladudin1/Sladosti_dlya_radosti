<template>
  <div class="app-container">
    <header>
      <img src="@/components/images/logo.png" alt="Логотип" class="logo">
      <button class="burger-menu" @click="toggleMobileMenu">☰</button>

      <div class="header-content">
        <nav :class="{ active: isMobileMenuOpen }">
          <router-link to="/" @click="closeMobileMenu">Главная</router-link>
          <router-link to="/portfolio" @click="closeMobileMenu">Портфолио</router-link>
          <router-link to="/flavors-and-prices" @click="closeMobileMenu">Начинки и цены</router-link>
          <router-link to="/about" @click="closeMobileMenu">Обо мне</router-link>
        </nav>
      </div>

      <div class="order-container">
        <button @click="toggleOrderPopup" class="order-button">Заказать</button>
      </div>
    </header>

    <main class="content">
      <router-view></router-view>
    </main>

    <footer>
      <a href="https://vk.com/sladostidlyuradosti" target="_blank" class="vk-icon">
        <img src="@/components/images/vk-icon.png" alt="ВКонтакте">
      </a>
      <p class="footer-title">Контактная информация</p>
      <span class="email">sladosti_dlya_radosti@email.com</span>
      <button @click="toggleFeedbackPopup" class="feedback-button">Обратная связь</button>
    </footer>

    <!-- Затемненный фон для заказа -->
    <div v-if="showOrderPopup" class="order-popup-overlay" @click="closeOrderPopup"></div>

    <!-- Всплывающее окно заказа -->
    <div v-if="showOrderPopup" class="order-popup">
      <div class="popup-content">
        <!-- Левая колонка: Контакты -->
        <div class="contact-info">
          <p><strong>Телефон:</strong><br> +7 (902) 688-52-12</p>
          <p><strong>Написать:</strong></p>
          <a href="https://vk.com/im?entrypoint=community_page&media=&sel=-177235808" target="_blank">
            <img src="@/components/images/message-icon.png" alt="Написать в VK" class="message-icon">
          </a>
          <img src="@/components/images/zakaz.jpg" alt="Заказ" class="zakaz-image">
        </div>
        <!-- Правая колонка: Карта -->
        <div class="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d4535.1451937058255!2d45.04420812893802!3d56.022222397942585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d56.0219248!2d45.049385799999996!5e1!3m2!1sru!2sru!4v1742408571586!5m2!1sru!2sru" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>

    <!-- Затемненный фон для обратной связи -->
    <div v-if="showFeedbackPopup" class="feedback-popup-overlay" @click="closeFeedbackPopup"></div>

    <!-- Всплывающее окно обратной связи -->
    <div v-if="showFeedbackPopup" class="feedback-popup">
      <div class="feedback-content">
        <h2>Обратная связь</h2>
        <form @submit.prevent="submitFeedback">
          <div class="form-group">
            <label for="name">Ваше имя:</label>
            <input type="text" id="name" v-model="feedback.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="feedback.email" required>
          </div>
          <div class="form-group">
            <label for="message">Сообщение:</label>
            <textarea id="message" v-model="feedback.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-button">Отправить</button>
          <button type="button" @click="closeFeedbackPopup" class="cancel-button">Отмена</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showOrderPopup: false,
      showFeedbackPopup: false,
      isMobileMenuOpen: false,
      windowWidth: window.innerWidth,
      feedback: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      if (this.windowWidth <= 768) {
        this.isMobileMenuOpen = false;
      }
    },
    toggleOrderPopup() {
      this.showOrderPopup = true;
    },
    closeOrderPopup() {
      this.showOrderPopup = false;
    },
    toggleFeedbackPopup() {
      this.showFeedbackPopup = true;
    },
    closeFeedbackPopup() {
      this.showFeedbackPopup = false;
    },
    submitFeedback() {
      console.log('Форма отправлена:', this.feedback);
      alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
      this.closeFeedbackPopup();
      this.feedback = {
        name: '',
        email: '',
        message: ''
      };
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768) {
        this.isMobileMenuOpen = false;
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style>
/* Подключаем шрифт */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Контейнер страницы */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Основной контент */
.content {
  flex: 1;
}

/* Шапка */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0f0f0;
  padding: 15px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header-content {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
}

/* Логотип */
.logo {
  height: 80px;
  margin-right: 30px;
}

/* Навигация */
nav {
  display: flex;
  gap: 25px;
}

nav a {
  display: inline-block;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: 600;
  color: black;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

nav a:hover {
  background: #ffcccb;
  color: white;
  transform: scale(1.1);
}

nav a.router-link-exact-active {
  background: #ff9999;
  color: white;
}

/* Кнопка Заказать */
.order-container {
  position: relative;
  margin-right: 50px;
}

.order-button {
  background: #ff6666;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.order-button:hover {
  background: #cc3333;
  transform: scale(1.05);
}

/* Фон для закрытия окон */
.order-popup-overlay,
.feedback-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

/* Всплывающее окно заказа */
.order-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  width: 1000px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 20;
  display: flex;
  flex-direction: column;
}

/* Контент всплывающего окна заказа */
.popup-content {
  display: flex;
  gap: 15px;
}

/* Всплывающее окно обратной связи */
.feedback-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 20;
}

.feedback-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feedback-content h2 {
  color: #ff6666;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ff9999;
  outline: none;
}

.submit-button {
  background: #ff6666;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 10px;
}

.submit-button:hover {
  background: #cc3333;
}

.cancel-button {
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.cancel-button:hover {
  background: #ddd;
}

/* Иконка мессенджера */
.message-icon {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.message-icon:hover {
  transform: scale(1.2);
}

.zakaz-image {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: auto;
}

/* Футер */
footer {
  background: #f8e8e8;
  padding: 20px;
  text-align: center;
  margin-top: auto;
  border-top: 3px solid #ff9999;
  position: relative;
}

.footer-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

/* Иконка ВКонтакте в футере */
.vk-icon img {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.vk-icon img:hover {
  transform: scale(1.1);
}

.email {
  font-size: 18px;
  color: #ff6666;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  margin-bottom: 15px;
}

.email:hover {
  color: #cc3333;
  text-decoration: underline;
}

/* Кнопка обратной связи в футере */
.feedback-button {
  background: #ff9999;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  margin-top: 10px;
}

.feedback-button:hover {
  background: #ff6666;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Мобильная шапка */
.mobile-header {
  display: none;
}

/* ===== Адаптивность ===== */
.burger-menu {
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 5px 10px;
  color: #333;
}

/* Адаптивные стили */
@media (max-width: 768px) {
  header {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px 15px;
  }

  .logo {
    height: 60px;
    margin-right: auto; /* Логотип остается слева */
  }

  .burger-menu {
    display: block; /* Показываем только на мобильных */
    order: 2; /* Размещаем после логотипа */
  }

  .header-content {
    width: 100%;
    order: 3; /* Размещаем под другими элементами */
    margin-top: 10px;
  }

  nav {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 10px 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  nav.active {
    display: flex;
  }

  nav a {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 0;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s ease;
  }

  nav a:hover {
    background: #ffcccb;
    color: white;
  }

  .order-container {
    order: 1; /* Размещаем справа */
    margin-left: auto;
    margin-top: 0;
  }

  .order-button:hover {
    background: #cc3333;
  }
}

@media (max-width: 480px) {
  .logo {
    height: 50px;
  }
}
</style>
