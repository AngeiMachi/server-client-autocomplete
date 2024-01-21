import { Injectable } from '@nestjs/common';
import { Trie } from './models';
import * as fs from 'fs';

@Injectable()
export class AppService {
  
  private trie = new Trie();

  constructor() {
    this.initCities();
  }

  initCities(): void {
    const citiesString = fs.readFileSync('./src/world-cities.txt', 'utf8');
    const citiesArray = citiesString.split('\r\n').filter(city => city.trim() !== '');
    //const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Seattle"];
    for (const city of citiesArray) {
        this.trie.insert(city.toLowerCase()); // Convert to lowercase for case-insensitive search
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
  getAutocomplete(queryPrefix:string,limit:number=10,page:number=1): string[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return this.trie.search(queryPrefix).slice(startIndex, endIndex);
  }
}
