import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumirTexto',
  standalone: true // ✅ importante si estás usando Angular standalone
})
export class ResumirTextoPipe implements PipeTransform {
  transform(valor: string = '', limite: number = 100): string {
    if (!valor) return '';
    return valor.length > limite ? valor.substring(0, limite) + '...' : valor;
  }
}
