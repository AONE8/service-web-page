import { json } from "react-router-dom";

export async function WOAServiceAction({ request }) {
  // отримання даних від форми
  let formData = await request.formData();

  try {
    // виконання POST запиту та отримання відповіді
    const response = await fetch("http://localhost:8000/api/woa-selection/", {
      method: "POST",
      body: formData,
    });

    // отримання даних від відповіді
    const data = await response.json();

    if (response.ok) {
      return json(data, { status: 201 });
    }

    return json(data, { status: 200 });
  } catch (error) {
    // якщо трапилась помилка - сервер не відповів, то повертаємо повідомлення про помилку на сторінку
    return json(
      { status: "failure", error: "Server is not responding" },
      { status: 200 }
    );
  }
}
