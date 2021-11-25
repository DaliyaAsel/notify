export default function loadMore(res) {
    const messages = [];

    // if > 3
    if (res.length > 3) {
        for (let i = 0; i < 3; i++) {
            res[i].main = true; // меняем наши сообщения с main = false, на main = true
            messages.push(res[i]);
        }
        return messages //возвращаем отфильтрованный  messages

    } else { // if < 3
        for (let i = 0; i < res.length; i++) {
            res[i].main = true
            messages.push(res[i]);
        }
        return messages //возвращаем отфильтрованный  messages
    }

}