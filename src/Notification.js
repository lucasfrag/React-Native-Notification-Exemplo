import PushNotification from "react-native-push-notification"
  let navegador;
  class Notification {

      setNavegador(novoConteudo)
      {
          navegador = novoConteudo
      }

      //Criar canal para as notificações serem disparadas 
      criarCanal = () => {
        PushNotification.createChannel(
            {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            //importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }

      // Configuração orientada pela documentação do React Native Push Notification
      // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
      configurar = () => {
          PushNotification.configure({
              onRegister: function (token) {
                  console.log("[NotificationManager] onRegister token:", token);
                },
              onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);
                navegador.navigate("Detalhes")
              },
              onAction: function(notification){
                  console.log("ACTION:", notification.action)
              }
          })
      }

      // É aqui que nossa notificação para o Android é construida
      buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
          return {
              id: id,
              autoCancel: true,
              channelId: "channel-id",
              largeIcon: options.largeIcon || "ic_launcher",
              smallIcon: options.smallIcon || "ic_launcher",
              bigText: message || '',
              subText: title || '',
              vibrate: options.vibrate || false,
              vibration: options.vibration || 300,
              priority: options.priority || "high",
              importance: options.importance || "high",
              data: data            
          }
      }

      // Fução que exibe a notificação
      showNotification = (id, title, message, data = {}, options = {}) => {
          PushNotification.localNotification({
              /* Propriedades do Android */
              ...this.buildAndroidNotification(id, title, message, data, options),

              /* Propriedades do Android e iOS */
              title: title || "",
              message: message || "",
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false
          })
      }

      // Função que cancela todas notiificações e limpa as que estão no centro de notificações
      cancelAllLocalNotification = () => {
          PushNotification.cancelAllLocalNotifications();
      }

      agendarNotificacao() {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id:2,
            channelId: 'channel-id',
            title: 'Notificação Agendada 1',
            message: "Parabéns! Você disparou uma notificação!", // (required)
            date: new Date(Date.now() + 5 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            repeatTime: 15*1000,
            repeatType: 'time'
          });

          PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id:3,
            channelId: 'channel-id',
            title: 'Notificação Agendada 2',
            message: "Notificação agendada 2!", // (required)
            date: new Date(Date.now() + 10 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            repeatTime: 20*1000,
            repeatType: 'time'
          });
      }

  }

  export const notificationManager = new Notification();