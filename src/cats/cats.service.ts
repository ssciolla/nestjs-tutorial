import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  getNextID(): number {
    const max = Math.max(...this.cats.map((c) => c.id));
    return max !== -Infinity ? max + 1 : 0;
  }

  find(id: number): Cat | undefined {
    return this.cats.find((c) => c.id == id);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  create(cat: Cat) {
    this.cats.push(cat);
    return true;
  }

  update(cat: Cat): boolean {
    const catToUpdate = this.find(cat.id);
    if (catToUpdate === undefined) return false;
    this.cats = this.cats.filter((c) => c.id !== cat.id);
    this.cats.push(cat);
    return true;
  }

  delete(id: number): boolean {
    const catToDelete = this.find(id);
    if (catToDelete === undefined) return false;
    this.cats = this.cats.filter((c) => c.id !== id);
    return true;
  }
}
