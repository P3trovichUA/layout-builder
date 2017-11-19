import React from 'react';

import DefaultLayout from './layout/DefaultLayout';

export default () => (
  <DefaultLayout title="Заголовок головної сторінки">
    <div className="jumbotron">
      <h1 className="display-3">Привіт!!!</h1>
      <p className="lead">А давайте спробуємо збирати наші сторінки використовуючи не старі інструманти, з якимось незрозумілим синтаксисом, а технологіями, з якими можна іти в майбутнє?</p>
      <hr className="my-4"/>
      <p>Тут ще один абзац</p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button">А це якесь посилання ц вигляді кнопки</a>
      </p>
    </div>
  </DefaultLayout>
);
