/* ============================================
   Калькулятор мощности кондиционера
   Расчет необходимой мощности в кВт и BTU
   ============================================ */

(function() {
  'use strict';

  /**
   * Калькулятор мощности кондиционера
   */
  class PowerCalculator {
    constructor(container) {
      this.container = container;
      this.form = container?.querySelector('.calculator-power__form');
      this.resultContainer = container?.querySelector('.calculator-power__result');
      this.init();
    }

    init() {
      if (!this.form) return;

      // Обработчик отправки формы
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.calculate();
      });

      // Обработчик изменений в полях
      const inputs = this.form.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('change', () => {
          if (this.form.checkValidity()) {
            this.calculate();
          }
        });
      });
    }

    /**
     * Рассчитывает необходимую мощность кондиционера
     */
    calculate() {
      const formData = new FormData(this.form);
      const area = parseFloat(formData.get('area')) || 0;
      const roomType = formData.get('roomType') || 'apartment';
      const ceilingHeight = parseFloat(formData.get('ceilingHeight')) || 2.5;
      const windows = parseInt(formData.get('windows')) || 1;
      const floor = parseInt(formData.get('floor')) || 1;
      const equipment = formData.get('equipment') === 'yes';
      const sunExposure = formData.get('sunExposure') || 'normal';

      // Базовый расчет: 1 кВт на 10 м² (для стандартной квартиры)
      let basePower = area / 10;

      // Коэффициенты для разных типов помещений
      const roomCoefficients = {
        apartment: 1.0,
        office: 1.2,
        shop: 1.5,
        restaurant: 1.8,
        server: 2.5
      };
      basePower *= roomCoefficients[roomType] || 1.0;

      // Учет высоты потолков
      if (ceilingHeight > 3) {
        basePower *= (ceilingHeight / 2.5);
      }

      // Учет окон
      basePower += (windows - 1) * 0.1;

      // Учет этажа (верхние этажи теплее)
      if (floor >= 5) {
        basePower *= 1.1;
      }

      // Учет техники
      if (equipment) {
        basePower += 0.3;
      }

      // Учет солнечной стороны
      const sunCoefficients = {
        north: 0.9,
        normal: 1.0,
        south: 1.2
      };
      basePower *= sunCoefficients[sunExposure] || 1.0;

      // Округление до ближайшего стандартного значения
      const standardPowers = [2.0, 2.5, 3.5, 5.0, 7.0, 9.0, 12.0, 14.0, 18.0, 24.0];
      let recommendedPower = standardPowers.find(p => p >= basePower) || standardPowers[standardPowers.length - 1];

      // Конвертация в BTU (1 кВт ≈ 3412 BTU)
      const btu = Math.round(recommendedPower * 3412);

      // Рекомендация модели
      const recommendation = this.getRecommendation(recommendedPower, area);

      // Отображение результата
      this.showResult({
        area,
        calculatedPower: basePower.toFixed(1),
        recommendedPower,
        btu,
        recommendation
      });
    }

    /**
     * Получает рекомендацию модели на основе мощности
     */
    getRecommendation(power, area) {
      if (power <= 2.5) {
        return {
          type: 'Настенная сплит-система',
          models: ['Daikin FTXS25K', 'Mitsubishi MSZ-LN25'],
          coverage: 'до 25 м²'
        };
      } else if (power <= 5.0) {
        return {
          type: 'Настенная сплит-система',
          models: ['LG S12EQ3', 'Samsung AR12'],
          coverage: '25-35 м²'
        };
      } else if (power <= 7.0) {
        return {
          type: 'Напольно-потолочная система',
          models: ['Daikin FVXS', 'Mitsubishi Electric MSZ'],
          coverage: '35-50 м²'
        };
      } else {
        return {
          type: 'Кассетная или канальная система',
          models: ['Daikin FDTQ', 'Mitsubishi Electric PLFY'],
          coverage: '50+ м²'
        };
      }
    }

    /**
     * Отображает результат расчета
     */
    showResult(result) {
      if (!this.resultContainer) return;

      const html = `
        <div class="calculator-power__result-content">
          <h3 class="calculator-power__result-title">Результат расчета</h3>
          
          <div class="calculator-power__result-stats">
            <div class="calculator-power__stat">
              <span class="calculator-power__stat-label">Расчетная мощность</span>
              <span class="calculator-power__stat-value">${result.calculatedPower} кВт</span>
            </div>
            <div class="calculator-power__stat">
              <span class="calculator-power__stat-label">Рекомендуемая мощность</span>
              <span class="calculator-power__stat-value calculator-power__stat-value--highlight">${result.recommendedPower} кВт</span>
            </div>
            <div class="calculator-power__stat">
              <span class="calculator-power__stat-label">В BTU</span>
              <span class="calculator-power__stat-value">${result.btu.toLocaleString('ru-RU')} BTU</span>
            </div>
          </div>

          <div class="calculator-power__recommendation">
            <h4 class="calculator-power__recommendation-title">Рекомендация</h4>
            <p class="calculator-power__recommendation-text">
              Для помещения площадью <strong>${result.area} м²</strong> рекомендуется 
              <strong>${result.recommendation.type.toLowerCase()}</strong> мощностью 
              <strong>${result.recommendedPower} кВт</strong> (покрытие: ${result.recommendation.coverage}).
            </p>
            <p class="calculator-power__recommendation-models">
              Подходящие модели: ${result.recommendation.models.join(', ')}
            </p>
          </div>

          <div class="calculator-power__actions">
            <a href="/katalog.html" class="btn btn--primary">Посмотреть каталог</a>
            <a href="tel:+74997575719" class="btn btn--outline">Позвонить консультанту</a>
          </div>

          <p class="calculator-power__disclaimer">
            <small>
              * Расчет является приблизительным. Для точного подбора модели рекомендуется вызов специалиста для бесплатного замера.
            </small>
          </p>
        </div>
      `;

      this.resultContainer.innerHTML = html;
      this.resultContainer.style.display = 'block';
      
      // Плавное появление результата
      setTimeout(() => {
        this.resultContainer.classList.add('calculator-power__result--visible');
      }, 10);
    }
  }

  // Инициализация калькулятора при загрузке DOM
  function initCalculator() {
    const calculatorContainer = document.querySelector('.calculator-power');
    if (calculatorContainer) {
      new PowerCalculator(calculatorContainer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
  } else {
    initCalculator();
  }

  // Экспорт для использования в других скриптах
  window.PowerCalculator = PowerCalculator;

})();

