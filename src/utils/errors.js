export const errors = (status) => {
    let message = '';
    switch (status) {
        case 400:
          message = 'При обновлении профиля произошла ошибка';
          break;
        case 500:
            message = 'На сервере произошла ошибка';
            break;
        case 404:
            message = 'Страница по указанному маршруту не найдена';
            break;
        default:
            message ='Произошла ошибка';
      };
    return message;
};