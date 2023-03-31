module.exports = {
  apps: [
    {
      name: "Twitter_Telegram_Bot",
      script: "server.js",
      watch: ".",
      cwd: " /var/www/ " /* (рядок) каталог, з якого буде запущено вашу програму */,
      args: " -a 13 -b 12 " /* (рядок) рядок, що містить усі аргументи, передані через CLI до сценарію */,
      інтерпретатор:
        " /usr/bin/python " /* (рядок) абсолютний шлях інтерпретатора (за замовчуванням для вузла) */,
      interpreter_args:
        " --harmony " /* (рядок) параметр для передачі інтерпретатору */,
      //"node_args": "", /* (рядок) псевдонім interpreter_args */
      exec_interpreter: " вузол ",

      /* Розширені функції */
      instances: 1 /* кількість екземплярів програми, які потрібно запустити */,
      exec_mode:
        " fork " /* (рядковий) режим для запуску вашої програми, може бути “cluster” або “fork”, типовий fork */,
      watch: true /* (логічний або []) увімкнути функцію перегляду та перезапуску, якщо файл зміниться в папці чи підпапці, програма перезавантажиться */,
      ignore_watch:
        [] /* (список) список регулярних виразів для ігнорування деяких імен файлів або папок функцією спостереження */,
      max_memory_restart:
        " 150M " /* (рядок) вашу програму буде перезапущено, якщо вона перевищить вказаний обсяг пам’яті. зручний для людини формат: це може бути «10M», «100K», «2G» і так далі... */,
      env: {
        NODE_ENV: " development ",
        ID: 42,
      } /* (об’єкт) змінні env, які відображатимуться у вашій програмі */,
      env_production: {
        NODE_ENV: " production ",
        ID: 89,
      } /* (об’єкт) ін’єктувати під час виконання pm2 restart ecosystem.json --env */,
      source_map_support: true /* (логічний) за замовчуванням true, [увімкнути/вимкнути файл вихідної карти] */,
      instance_var:
        " NODE_APP_INSTANCE " /* (рядок) див. документацію http://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables */,
      treekill:
        істина /* (bool) за замовчуванням істинно Вбити дочірній процес */,

      /* Файли журналу */
      log_date_format: " РРРР-ММ-ДД ГГ:хх Z " /* (рядок) формат дати журналу */,
      //"error_file": "", /* (рядок) шлях до файлу помилки (за замовчуванням $HOME/.pm2/logs/XXXerr.log) */
      //"out_file": "", /* (рядок) вихідний шлях до файлу (за замовчуванням $HOME/.pm2/logs/XXXout.log) */
      combine_logs: true /* (логічне значення), якщо встановлено значення true, уникайте суфікса файлу журналів з ідентифікатором процесу */,
      //"merge_logs": "", /* (логічний) псевдонім для combine_logs*/
      //"pid_file": "", /* (рядок) шлях до файлу pid (за замовчуванням $HOME/.pm2/pid/app-pm_id.pid) */
      log_type: " json " /* жодна документована функція */,
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
