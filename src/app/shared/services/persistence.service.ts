import { Injectable } from '@angular/core'

@Injectable()

export class PersistenceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.log('Error saving to localStorage', e)
    }
  }

  get() {

  }
}
