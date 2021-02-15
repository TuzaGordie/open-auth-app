import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  static loadScriptPage(dynamicScripts) {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }
    if (!isFound) {
      for (const dynamicScript of dynamicScripts) {
        const node = document.createElement('script');
        node.src = dynamicScript;
        node.type = 'text/javascript';
        node.async = false;
        document.getElementById('scripts_page').appendChild(node);
      }
    }
  }
}
