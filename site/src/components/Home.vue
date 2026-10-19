<template>
  <div class="home">
    <!-- Баннер -->
    <section class="banner">
      <h1>Торты на заказ в Лыскове</h1>
    </section>

    <!-- Описание -->
    <section class="intro">
      <div class="text">
        <h2><i>&nbsp &nbsp &nbspМОИ ТОРТЫ СДЕЛАНЫ ВРУЧНУЮ<br> с любовью.</i></h2>
        <p class="subtext">
          <i>&nbsp &nbsp &nbsp Домашние торты на заказ в Лыскове, капкейки, порционные десерты в стакане,
          домашний зефир. Лучшие натуральные ингредиенты, чистый состав.
            Детские, взрослые и свадебные торты.</i>
        </p>
      </div>
      <img src="@/components/images/cake-main.jpg" alt="Торт" class="main-cake">
    </section>

    <!-- Галерея карточек -->
    <section class="gallery">
      <div class="card">
        <img src="@/components/images/cake1.jpg" alt="Торт 1">
        <router-link to="/portfolio" class="button">Портфолио</router-link>
      </div>
      <div class="card">
        <img src="@/components/images/mom.jpg" alt="Торт 2">
        <router-link to="/About" class="button">Обо мне</router-link>
      </div>
      <div class="card">
        <img src="@/components/images/cake3.jpg" alt="Торт 3">
        <router-link to="/flavors-and-prices" class="button">Начинки и цены</router-link>
      </div>
    </section>
<br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
/* Общие стили */
.home {
  font-family: Tahoma;
  text-align: center;
}

/* Баннер */
.banner {
  background: url('@/components/images/banner-bg.jpg') no-repeat center/cover;
  padding: 170px 0;
  color: black;
  font-size: 24px;
  font-weight: bold;
}

/* Описание */
.intro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 50px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  gap: 40px;
}

/* Текст */
.text {
  flex: 1;
  font-family: Tahoma;
}

.text h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.subtext {
  font-size: 19px;
  color: #666;
  line-height: 1.6;
  max-width: 500px;
}

/* Основное изображение */
.main-cake {
  width: 380px; /* Увеличил размер */
  border-radius: 12px;
  flex-shrink: 0;
}

/* Галерея */
.gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 250px;
}

.card img {
  width: 100%;
  height: 230px; /* Установи одинаковую высоту */
  object-fit: cover; /* Обрезка изображения для сохранения пропорций */
  border-radius: 8px;
  margin-bottom: 10px;
}

/* Кнопки */
.button {
  display: inline-block;
  background: #ff9999; /* Розовый акцент */
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-size: 16px;
}

/* Эффект при наведении */
.button:hover {
  background: #ff6666; /* Чуть темнее при наведении */
  transform: scale(1.1);
}

.banner h1 {
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
}

</style>
