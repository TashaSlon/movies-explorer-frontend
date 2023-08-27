export const errors = (status) => {
    let message = '';
    switch (status) {
        case 400:
          message = 'При обновлении профиля произошла ошибка';
          break;
        case 4:
          alert( 'В точку!' );
          break;
        case 5:
          alert( 'Перебор' );
          break;
        default:
          alert( "Нет таких значений" );
      };
    return message;
};