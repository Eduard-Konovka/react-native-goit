const EDIT_PROFILE = {
  title: {
    eng: 'Add your photo',
    ger: 'Fügen Sie Ihr Foto hinzu',
    spa: 'Agrega tu foto',
    ukr: 'Додайте своє фото',
  },

  button: {
    library: {
      eng: 'Library',
      ger: 'Bibliothek',
      spa: 'Biblioteca',
      ukr: 'Бібліотека',
    },

    takePhoto: {
      eng: 'Take a photo',
      ger: 'Mach ein Foto',
      spa: 'Toma una foto',
      ukr: 'Зробіть фото',
    },

    cancel: {
      eng: 'Cancel',
      ger: 'Stornieren',
      spa: 'Cancelar',
      ukr: 'Скасувати',
    },
  },
};

const EDIT_CONTACTS = {
  title: {
    eng: 'Edit Contacts',
    ger: 'Kontakte bearbeiten',
    spa: 'Editar contactos',
    ukr: 'Редагувати контакти',
  },
};

const PHOTO_LIBRARY = {
  title: {
    eng: 'Photo library',
    ger: 'Fotobibliothek',
    spa: 'librería fotográfica',
    ukr: 'Бібліотека фотографій',
  },

  button: {
    eng: 'Settings',
    ger: 'Einstellungen',
    spa: 'Ajustes',
    ukr: 'Налаштування',
  },
};

const CAMERA = {
  getAccess: {
    eng: 'We get access to the camera',
    ger: 'Wir bekommen Zugriff auf die Kamera',
    spa: 'Nosotras tenemos acceso a la camara',
    ukr: 'Отримуємо доступ до камери',
  },

  noAccess: {
    eng: 'No access to camera',
    ger: 'Kein Zugriff auf die Kamera',
    spa: 'Sin acceso a la cámara',
    ukr: 'Немає доступу до камери',
  },

  alert: {
    permissionsError: {
      title: {
        eng: 'Camera access error',
        ger: 'Kamerazugriffsfehler',
        spa: 'Error de acceso a la cámara',
        ukr: 'Помилка доступу до камери',
      },

      description: {
        eng: 'Permission to access the camera was denied',
        ger: 'Der Zugriff auf die Kamera wurde verweigert',
        spa: 'Se denegó el permiso para acceder a la cámara',
        ukr: 'У доступі до камери відмовлено',
      },
    },

    cameraError: {
      eng: 'Camera error',
      ger: 'Kamerafehler',
      spa: 'Error de cámara',
      ukr: 'Помилка камери',
    },

    uploadError: {
      eng: 'File upload error',
      ger: 'Fehler beim Hochladen der Datei',
      spa: 'Error al cargar el archivo',
      ukr: 'Помилка завантаження файлу',
    },

    addingError: {
      eng: 'Error adding profile',
      ger: 'Fehler beim Hinzufügen des Profils',
      spa: 'Error al agregar perfil',
      ukr: 'Помилка додавання профілю',
    },

    snapshotError: {
      eng: 'Error getting snapshot of profile collection',
      ger: 'Fehler beim Abrufen des Schnappschusses der Profilsammlung',
      spa: 'Error al obtener una instantánea de la recopilación de perfiles',
      ukr: 'Помилка отримання знімка колекції профілів',
    },
  },

  button: {
    snap: {
      eng: 'SNAP',
      ger: 'SCHNAPPEN',
      spa: 'QUEBRAR',
      ukr: 'ЗНІМОК',
    },

    flip: {
      eng: 'SNAP',
      ger: 'KIPPEN',
      spa: 'VOLTEAR',
      ukr: 'ОБЕРНУТИ',
    },

    send: {
      eng: 'SEND',
      ger: 'SCHICKEN',
      spa: 'ENVIAR',
      ukr: 'НАДІСЛАТИ',
    },
  },
};

const BLE = {
  title: {
    eng: 'Please connect to a peripheral device',
    ger: 'Bitte mit einem Peripheriegerät verbinden',
    spa: 'Conéctese a un dispositivo periférico.',
    ukr: 'Підключіться до периферійного пристрою',
  },

  permissions: {
    title: {
      eng: 'Location Permission',
      ger: 'Verbinden',
      spa: 'Conectar',
      ukr: 'Підключитися',
    },

    message: {
      eng: 'Bluetooth Low Energy requires Location',
      ger: 'Verbinden',
      spa: 'Conectar',
      ukr: 'Підключитися',
    },

    button: {
      neutral: {
        eng: 'Ask Later',
        ger: 'Verbinden',
        spa: 'Conectar',
        ukr: 'Підключитися',
      },

      negative: {
        eng: 'Cancel',
        ger: 'Verbinden',
        spa: 'Conectar',
        ukr: 'Підключитися',
      },

      positive: {
        eng: 'OK',
        ger: 'Verbinden',
        spa: 'Conectar',
        ukr: 'Підключитися',
      },
    },
  },

  errorDeviceScan: {
    eng: 'Error starting devices scan:',
    ger: 'Fehler beim Starten des Gerätescans:',
    spa: 'Error al iniciar el análisis de dispositivos:',
    ukr: 'Помилка запуску сканування пристроїв:',
  },

  button: {
    connect: {
      eng: 'Connect',
      ger: 'Verbinden',
      spa: 'Conectar',
      ukr: 'Підключитися',
    },
  },
};

export { EDIT_PROFILE, EDIT_CONTACTS, PHOTO_LIBRARY, CAMERA, BLE };
