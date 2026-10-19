<template>
  <div class="about-container">
    <h1>ОБО МНЕ</h1>
    <h2 class="name">МЕНЯ ЗОВУТ СВЕТЛАНА.</h2>

    <p class="intro">
      <i>Я домашний кондитер. Здесь вы можете заказать торты, бенто-торты, трайфлы, капкейки, пряники, домашний зефир. Только натуральные ингредиенты.</i>
    </p>

    <div class="content">
      <img src="@/components/images/mom.png" alt="Светлана" class="profile-photo">

      <div class="text">
        <hr>
        <p>
          <i>В <b>2019 году</b> я начала заниматься пряниками. Я много училась, проходила различные онлайн-курсы. С 2020 года стала изготавливать тортики.</i>
        </p>

        <p>
          <i>На данный момент я занимаюсь своим кондитерским делом уже <strong>6-ой год</strong>.
         </i>
        </p>

        <p>
          <i>Я очень люблю своё дело, и убеждена, что только сделанное <b>с любовью </b> может быть по-настоящему ценным. Мне нравится дарить людям <b>радость</b>.</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 50px auto;
  text-align: center;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
}

.name {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}

.intro {
  font-size: 16px;
  margin: 20px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  gap: 30px;
}

.profile-photo {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.text {
  text-align: left;
  max-width: 500px;
}

.text hr {
  width: 50px;
  border: 2px solid black;
  margin-bottom: 15px;
}

.text p {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}

strong {
  font-weight: bold;
}

em {
  font-style: italic;
  color: #777;
}

/* Адаптация под мобильные устройства */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
  }

  .profile-photo {
    width: 80%;
  }

  .text {
    text-align: center;
  }
}
</style>
