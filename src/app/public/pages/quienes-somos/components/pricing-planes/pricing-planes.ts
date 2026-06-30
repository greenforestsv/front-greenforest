import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'pricing-planes',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
      <div class="flex flex-col gap-4 items-center justify-center mb-12">
        <h2 class="text-surface-900  text-4xl text-center leading-tight">Planes Empresariales</h2>
        <div class="text-surface-500 dark:text-surface-400 text-lg text-center leading-normal">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </div>
      </div>

      <div class="flex lg:flex-row flex-col gap-8 max-w-7xl mx-auto">
        <!-- <div
          class="w-full flex-1 p-8 flex rounded-xl flex-col bg-surface-0 bg-white shadow-sm gap-6"
        >
          <div class="flex flex-col gap-2">
            <h4 class="text-surface-900  font-medium text-2xl leading-tight">
              Free
            </h4>
            <p class="text-surface-500 dark:text-surface-400 leading-normal">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="w-full h-px bg-surface-200"></div>
          <div class="flex items-center gap-2">
            <span class="text-3xl text-mid  leading-tight"
              >$0</span
            >
            <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight"
              >siempre gratis</span
            >
          </div>
          <div class="w-full h-px bg-surface-200"></div>
          <ul class="list-none flex flex-col gap-2 flex-1">
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Perfil profesional completo
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Historial laboral verificado
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Búsqueda de empleo
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Ver reputación de empresas
              </span>
            </li>
          </ul>
          <button pButton class="w-full">
            <span pButtonLabel>Contratar</span>
          </button>
        </div> -->
        <div
          class="w-full flex-1 flex rounded-xl flex-col bg-surface-0 bg-white shadow-sm gap-6 overflow-hidden"
        >
          <div class="flex flex-col gap-2 bg-primary text-white p-8">
            <h4 class=" font-medium text-2xl leading-tight">Free</h4>
            <p class="leading-normal text-white/80">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="px-8 flex flex-col gap-6 flex-1">
            <div class="w-full h-px bg-surface-200"></div>

            <div class="flex items-center gap-2">
              <span class="text-3xl text-mid  leading-tight"> $0 </span>
              <span class="font-medium text-surface-500 leading-tight"> siempre gratis </span>
            </div>

            <div class="w-full h-px bg-surface-200"></div>

            <ul class="list-none flex flex-col gap-2 flex-1">
              <li class="flex items-center gap-2">
                <span class="text-green-500">-</span>
                <span class="text-surface-800 dark:text-surface-100 leading-tight">
                  Perfil profesional completo
                </span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">-</span>
                <span class="text-surface-800 dark:text-surface-100 leading-tight">
                  Historial laboral verificado
                </span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">-</span>
                <span class="text-surface-800 dark:text-surface-100 leading-tight">
                  Búsqueda de empleo
                </span>
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">-</span>
                <span class="text-surface-800 dark:text-surface-100 leading-tight">
                  Ver reputación de empresas
                </span>
              </li>
            </ul>

            <button pButton class="w-full mb-8">
              <span pButtonLabel>Contratar</span>
            </button>
          </div>
        </div>
        <div
          class="w-full flex-1 p-8 flex rounded-xl flex-col bg-surface-0 bg-white shadow-sm gap-6"
        >
          <div class="flex flex-col gap-2">
            <h4 class="text-surface-900  font-medium text-2xl leading-tight">Básico</h4>
            <p class="text-surface-500 dark:text-surface-400 leading-normal">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="w-full h-px bg-surface-200"></div>
          <div class="flex items-center gap-2">
            <span class="text-3xl text-mid  leading-tight">$9</span>
            <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight"
              >por mes</span
            >
          </div>
          <div class="w-full h-px bg-surface-200 dark:bg-surface-600"></div>
          <ul class="list-none flex flex-col gap-2 flex-1">
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Perfil verificado de empresa
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Publicar vacantes
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Gestión de aplicaciones
              </span>
            </li>
          </ul>
          <button pButton class="w-full">
            <span pButtonLabel>Contratar</span>
          </button>
        </div>
        <div
          class="w-full flex-1 p-8 flex rounded-xl flex-col bg-surface-0 bg-white shadow-sm gap-6"
        >
          <div class="flex flex-col gap-2">
            <h4 class="text-surface-900  font-medium text-2xl leading-tight">Premium</h4>
            <p class="text-surface-500 dark:text-surface-400 leading-normal">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="w-full h-px bg-surface-200 dark:bg-surface-700"></div>
          <div class="flex items-center gap-2">
            <span class=" text-3xl text-mid  leading-tight">$29</span>
            <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight"
              >por mes</span
            >
          </div>
          <div class="w-full h-px bg-surface-200 dark:bg-surface-600"></div>
          <ul class="list-none flex flex-col gap-2 flex-1">
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span
              ><span class="text-surface-800 dark:text-surface-100 leading-tight">
                Todo lo del plan Básico
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span
              ><span class="text-surface-800 dark:text-surface-100 leading-tight">
                Módulo HR SaaS completo
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span
              ><span class="text-surface-800 dark:text-surface-100 leading-tight">
                Planilla y reportes
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span
              ><span class="text-surface-800 dark:text-surface-100 leading-tight">
                Alertas de ascenso
              </span>
            </li>
            <li class="flex items-center gap-2">
              <!-- <i class="pi pi-check-circle text-lg! text-green-500"></i>
               --><span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Vacantes ilimitadas
              </span>
            </li>
          </ul>
          <button pButton class="w-full">
            <span pButtonLabel>Contratar</span>
          </button>
        </div>
        <div
          class="w-full flex-1 p-8 flex rounded-xl flex-col bg-surface-0 bg-white shadow-sm gap-6"
        >
          <div class="flex flex-col gap-2">
            <h4 class="text-surface-900  font-medium text-2xl leading-tight">Enterprise</h4>
            <p class="text-surface-500 dark:text-surface-400 leading-normal">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>

          <div class="w-full h-px bg-surface-200 dark:bg-surface-700"></div>
          <div class="flex items-center gap-2">
            <span class=" text-3xl text-mid  leading-tight">$49</span>
            <span class="font-medium text-surface-500 dark:text-surface-400 leading-tight"
              >contrato anual</span
            >
          </div>
          <div class="w-full h-px bg-surface-200 dark:bg-surface-600"></div>
          <ul class="list-none flex flex-col gap-2 flex-1">
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Todo lo del plan Pro
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                API e integraciones
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Analítica avanzada
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Soporte dedicado
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">-</span>
              <span class="text-surface-800 dark:text-surface-100 leading-tight">
                Dashboard ejecutivo
              </span>
            </li>
          </ul>
          <button pButton class="w-full">
            <span pButtonLabel>Contratar</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PricingPlanes {}
