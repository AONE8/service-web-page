import { Form, useFetcher } from "react-router-dom";
import FileUploader from "../../components/FileUploader/FileUploader";
import Input from "../../components/Input/Input";
import mainClasses from "./Main.module.css";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MainPage() {
  const [file, setFile] = useState(null);
  //  використання fetcher дозволяє виконувати action без перходу на сторінку, а також завантажува від нього відповідь
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  // функція для очищення форми
  function handleReset(event) {
    event.preventDefault();

    for (const input of event.target) {
      if (input.value !== "") {
        input.value = "";
      }

      setFile(null);
    }
  }

  // функція для надсиалння даних

  function handleSubmit(event) {
    event.preventDefault();

    // отримує дані форми від таргету на якій виконалась подія
    const formData = new FormData(event.target);

    // імперативно надсилаємо дані на action від WOAService
    fetcher.submit(formData, {
      action: "/api/woa-selection",
      method: "POST",
      encType: "multipart/form-data",
    });

    // очищаємо дані форми
    handleReset(event);
  }

  return (
    <>
      {/* якщо дані надсилаються, з'являється лоадер */}
      {isSubmitting && <Loader />}

      {/* розділ "Про API" */}
      <section id="about-api" className={mainClasses["about-api-section"]}>
        <h2
          className={`${mainClasses["secondary-heading"]} ${mainClasses["light-heading"]}`}
        >
          Про API
        </h2>
        <p className={mainClasses["main-text"]}>
          Даний сервіс використовується для відбору інформативних ознак з даних
          отриманих від користувача. Користувач надсилає дані у форматі CSV
          (Comma-Separated Value) та отримує звіт у вебформаті з необхідними
          даними для аналізу і ознаками, що впливають на певний набір.
        </p>
        <p className={mainClasses["api-text"]}>
          <span>Даний API використовує домен</span>{" "}
          <code>http://localhost:8000/api</code>
        </p>
        <article className={mainClasses["api-item"]}>
          <code className={mainClasses["endpoint"]}>/woa-selection</code>
          <code className={mainClasses["http-method"]}>/POST</code>
          <p className={mainClasses["description"]}>
            Цей ендпоінт приймає наступні дані як{" "}
            <span className={mainClasses["text-highlighter"]}>
              research_title
            </span>{" "}
            &#8213; назва дослідження, яке мало на меті створити дані,{" "}
            <span className={mainClasses["text-highlighter"]}>file_csv</span>{" "}
            &#8213; файл, що містить дослідження дані у csv-форматі з ознаками
            та залежною змінною,{" "}
            <span className={mainClasses["text-highlighter"]}>whales_num</span>{" "}
            &#8213; кількість китів, яку необхідно задіяти для вибірки ознак,{" "}
            <span className={mainClasses["text-highlighter"]}>iter_num</span>{" "}
            &#8213; кількість ітерацій, за яких відбувається
            &quot;полювання&quot; на ознаки. Як відповідь повертає JSON-форматі.
            Якщо відбір ознак минув вдало, то повертається
            <pre className={mainClasses["success-json"]}>
              {`
              {
                "status": "success",
                "data": {
                  "research_title": "...",
                  "best_solution": [...],
                  "best_fitness: 123.456,
                  "selected_features_columns": [...],
                  "X": [
                    {
                      "feature_0": 123,
                      ...
                    },
                    ...
                  ],
                  "y": [
                    {
                      "result": 321,
                    },
                    ...
                  ],
                } 
              }
              `}
            </pre>
            Якщо під час відбору трапилась помилка, то повертається формат
            <pre className={mainClasses["failure-json"]}>
              {`
              {
                "status": "failure",
                "error": "..."
              }
              `}
            </pre>
          </p>
        </article>
      </section>
      {/* розділ "Відбір ознак" */}
      <section
        id="feature-selection"
        className={mainClasses["feature-selection-section"]}
      >
        <h2
          className={`${mainClasses["secondary-heading"]} ${mainClasses["dark-heading"]}`}
        >
          Відбір ознак
        </h2>

        {!isSubmitting && fetcher.data?.status === "failure" && (
          <ErrorMessage message={fetcher.data?.error} />
        )}
        <fetcher.Form
          className={mainClasses["feature-selection-form"]}
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="research_title"
            id="research_title"
            label="Назва дослідження"
          />

          <FileUploader
            type="file"
            name="csv_file"
            id="csv_file"
            accept=".csv"
            label="Файл з ознаками та залежною змінною"
            file={file}
            setFile={setFile}
          />

          <Input
            type="number"
            name="whales_num"
            id="whales_num"
            label="Кількість китів"
            min="5"
            max="10000"
          />

          <Input
            type="number"
            name="iter_num"
            id="iter_num"
            label="Кількість ітерацій"
            min="10"
            max="10000"
          />

          <div className={mainClasses["btn-container"]}>
            {/* якщо дані завантажуються, то кнопки блокуються */}
            <button type="reset" disabled={isSubmitting}>
              Очистити
            </button>
            <button type="submit" disabled={isSubmitting}>
              Надіслати
            </button>
          </div>
        </fetcher.Form>
      </section>

      {/* розділ "Результат" */}
      <section id="result" className={mainClasses["result-section"]}>
        <h2
          className={`${mainClasses["secondary-heading"]} ${mainClasses["middle-color-heading"]}`}
        >
          Результат
        </h2>

        {/* якщо дані від сервера існують, то з'являється звіт */}
        {fetcher.data?.data && (
          <article className={mainClasses["report"]}>
            <h3 className={mainClasses["report-heading"]}>
              {fetcher.data?.data["research_title"]}
            </h3>
            <p className={mainClasses["report-param"]}>Найкраще рішення </p>
            <code className={mainClasses["report-value"]}>
              <span className={mainClasses["brackets"]}>[</span>
              <ul>
                {fetcher.data?.data["best_solution"].map((bs, i) => {
                  return <li key={i}>{bs}</li>;
                })}
              </ul>
              <span className={mainClasses["brackets"]}>]</span>
            </code>
            <p className={mainClasses["report-param"]}>
              Найкраща допасованість
            </p>
            <code
              className={`${mainClasses["report-value"]} ${mainClasses["fitness"]}`}
            >
              {fetcher.data?.data["best_fitness"]}
            </code>
            <p className={mainClasses["report-param"]}>Обрані ознаки </p>
            <code className={mainClasses["report-value"]}>
              <ul className={mainClasses["selected-features"]}>
                {fetcher.data?.data["selected_features_columns"].map((f, i) => {
                  return <li key={i}>{f}</li>;
                })}
              </ul>
            </code>
            <p className={mainClasses["report-param"]}>
              Кількість необхідних ознак
            </p>
            <code
              className={`${mainClasses["report-value"]} ${mainClasses["selected-features-num"]}`}
            >
              {fetcher.data?.data["selected_features_columns"].length}
            </code>
            <div className={mainClasses["report-table-wrapper"]}>
              <table className={mainClasses["report-table"]}>
                <thead>
                  <tr>
                    <th></th>
                    {Object.keys(fetcher.data?.data?.X[0]).map((key) => {
                      return <th key={key}>{key}</th>;
                    })}
                    <th>{Object.keys(fetcher.data?.data?.y[0])[0]}</th>
                  </tr>
                </thead>
                <tbody>
                  {fetcher.data?.data.X.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{rowIndex + 1}.</td>
                      {Object.keys(fetcher.data?.data?.X[0]).map(
                        (feature, colIndex) => (
                          <td key={colIndex}>{row[feature]}</td>
                        )
                      )}
                      <td>
                        {fetcher.data?.data?.y[rowIndex] &&
                        Object.keys(fetcher.data?.data?.y[0])[0] in
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          fetcher.data?.data?.y[rowIndex]
                          ? fetcher.data?.data?.y[rowIndex][
                              Object.keys(fetcher.data?.data?.y[0])[0]
                            ]
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        )}

        {/* якщо даних від сервера немає, то з'являється повідомлення "Поки що дані відстутні." */}
        {fetcher.data?.status !== "success" && <p>Поки що дані відстутні.</p>}
      </section>
    </>
  );
}
