# simpleAJAX
SimpleAJAX ist eine sehr kleine Bibliothek, die es deutlich einfacher macht AJAX Request an den Server zu verwalten.

## Einbinden
Nach dem Download der aktuellsten Version (es empfiehlt sich die min-Version zu laden), muss die Datei auf den eigenen Webserver gespeichert werden und anschließend im Header der HTML Datei eingebunden werden. Hierbei muss die Bibliothek vor allen Dateien, die auf diese zurückgreifen, eingebunden werden.

```html
<script type="text/javascript" src="your/path/simpleAJAX.min.js"></script>
```

## Nutzung
Aktuell umfasst die Bibliothek nur eine Funktion: `simpleAJAX.request(formData, destinationURL, [callback_onComplete], [callback_onProgress])`. Mit dieser Funktion ist es möglich, Daten zu ermitteln und, falls gewünscht, die Antwort, sowie den Fortschritt, abzufangen.

### Dateianfrage an Server
Möchte man dynamisch Dateien nachladen (beispielsweise HTML oder JSON Dateien), ist dies sehr einfach möglich.
```javascript
simpleAJAX.request(null, '/config.json', function(data) {
    var parsed_data = JSON.parse(data);
    //do something
});
```
Hier ist die formData `null`, da keine Daten an den Server übertragen werden sollen. `/config.json` ist der Pfad zur Datei auf dem Webserver, welche geladen werden soll. In diesem Beispiel ist die `onComplete`-Callbackfunktion eine anonyme Funktion, die direkt im Funktionsaufruf definiert wird. Dies empfiehlt sich in vielen Fällen, ist aber nicht zwingend notwendig. Auch eine klassische Definition ist möglich:
```javascript
var onComplete = function(data) {
    var parsed_data = JSON.parse(data);
    //do something
};
simpleAJAX.request(null, '/config.json', onComplete);
```
Möchte man eine onProgress Funktion hinzufügen, dann ist dies kein Problem, sie kann jedoch auch einfach weggelassen werden.
```javascript
var onComplete = function(data) {
    var parsed_data = JSON.parse(data);
    //do something
};
var onProgress = function(event) {
    //do something
}
simpleAJAX.request(null, '/config.json', onComplete, onProgress);
```

### Datenübertragung an Server
Bevor Dateien an den Server gesendet werden können, müssen sie in ein `formData` Objekt gepackt werden. (Kleines Beispiel, mehr auf: [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects))
```javascript
var myFormData = new FormData();
myFormData.append('username', 'yourname');
myFormData.append('userID', 1234);
```
Es ist natürlich auch möglich Dateien wie Bilder zu senden:
```javascript
myFormData.append('profilepicture', fileInputElement.files[0]);
```
Anschließend muss das ganze nur noch an den Server gesendet werden:
```javascript
simpleAJAX.request(myFormData, '/php/handleUserInput.php');
```
In diesem Fall (hochladen eines Bildes) ist es möglich den `onProgress` Callback zu nutzen um eine Fortschrittsanzeige zu zeigen:
```javascript
simpleAJAX.request(myFormData, '/php/handleUserInput.php', undefined, function(event) {
    var percentage = Math.round(100 / event.total * event.loaded);
});
```

### Weiteres
Es ist natürlich auch möglich Anfragen an ein PHP Skript zu senden, die Antwort kann mit dieser Funktion genauso abgefangen werden.
