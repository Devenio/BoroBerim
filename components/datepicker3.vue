<template>
  <div class="wraper flex" @dateselected="handleDateSelected">
    <div
      class="datepicker mx-auto"
      :class="[
        { 'dp-w-sm': size == 'sm' },
        { 'dp-w-md': size == 'md' },
        { 'dp-w-lg': size == 'lg' || !size },
      ]"
    >
      <div
        :dir="locale === 'Jalali' ? 'rtl' : 'ltr'"
        class="dp-header"
        :class="[locale === 'Jalali' ? '' : '', animationDirection]"
      >
        <button
          class="dp-bg-white dp-rounded-md h-8 w-12 justify-center flex dp-focus:outline-none border"
          :v-show="isBackwardLimit()"
          :disabled="!isBackwardLimit()"
          :class="[
            !isBackwardLimit()
              ? 'border-gray-100  text-gray-100 '
              : 'text-gray-600',
          ]"
          @click.prevent="PrevMonth"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="dp-h-full dp-w-5 dp-text-sm dp-pointer-events-none p-1"
            :class="{ flipH: locale === 'Jalali' }"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              class="fill-current"
              d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
            />
          </svg>
        </button>
        <transition>
          <div
            :key="changeKey"
            class="dp-absolute dp-top-1/3 dp-left-1/2 dp--translate-x-1/2 dp-transform"
          >
            <div class="dp-h-full dp-w-auto flex justify-center">
              <span
                class="dp-text-norm items-center flex dp-text-gray-800 text-base font-bold"
              >
                {{ thisMonth.current.monthName }}
                {{ thisMonth.current.year }}
              </span>
            </div>
          </div>
        </transition>
        <button
          class="dp-bg-white dp-rounded-md h-8 w-12 justify-center flex dp-focus:outline-none border"
          :v-show="isForwardLimit()"
          :disabled="!isForwardLimit()"
          :class="[
            !isForwardLimit()
              ? 'border-gray-100  text-gray-100 '
              : 'text-gray-600',
          ]"
          @click.prevent="NextMonth"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="dp-h-full dp-w-5 dp-text-sm dp-pointer-events-none dp-focus:outline-none p-1"
            :class="{ flipH: locale === 'Jalali' }"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              class="fill-current"
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            />
          </svg>
        </button>
      </div>
      <div class="calander" :class="{ rtl: locale === 'Jalali' }">
        <div class="inrow dp-py-2">
          <div
            v-for="day in Settings[locale].WD"
            :key="day"
            class="days text-sm dp-font-medium text-gray-500"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid-cols-7 grid w-full">
          <div
            v-for="day in prevCounter"
            :key="day + 'prev'"
            class="dp-text-gray-300 days dp-font-bold h-full"
            style=""
          >
            <!-- {{
              locale === 'Jalali'
                ? getPersianNumeric(thisMonth.prev.LD - prevCounter + day)
                : thisMonth.prev.LD - prevCounter + day
            }} -->
          </div>
          <div
            v-for="day in thisMonth.current.LD"
            :key="day + 'c'"
            class="w-full pl-1 mb-1"
            :class="[
              { 'dp-dh-sm': size == 'sm' },
              { 'dp-dh-md': size == 'md' },
              { 'dp-dh-lg': size == 'lg' || !size },
            ]"
          >
            <button
              class="overflow-hidden font-extrabold relative focus:outline-none rounded w-full h-full flex justify-center items-center"
              :disabled="isDisabled(day)"
              :class="[
                isFridayOrThursday(day) &&
                !getDayColor(day) &&
                !isDisabled(day) &&
                !isInrange(day).value &&
                !isSelected(day)
                  ? 'dp-text-red-400'
                  : getTextColor(day),

                (!shouldApplyRangeLimit &&
                  isUnselectable(day) &&
                  !(enableAllDays && !isDefined(day))) ||
                (shouldApplyRangeLimit && !isInrangeOfUnselectable(day))
                  ? 'dp-text-gray-300 gradiant-line'
                  : 'dp-bg-secondary ' + getTextColor(day),

                isSelected(day) &&
                !(isInrange(day).isFirstDay || isInrange(day).isLastDay)
                  ? 'dp-text-white   ' + theme.Bg400
                  : '',
                isInrange(day).value
                  ? 'dp-w-full dp-text-white  ' + theme.Bg400
                  : '',
                isInrange(day).isFirstDay && locale === 'Jalali'
                  ? ' dp-w-full dp-text-white ' + theme.Bg400
                  : '',
                isInrange(day).isLastDay && locale === 'Jalali'
                  ? ' dp-w-full dp-text-white ' + theme.Bg400
                  : '',
                isInrange(day).isFirstDay && locale === 'Greg'
                  ? ' dp-w-full dp-text-white ' + theme.Bg400
                  : '',
                isInrange(day).isLastDay && locale === 'Greg'
                  ? 'dp-w-full dp-text-white ' + theme.Bg400
                  : '',
                isToday(day) && !isSelected(day)
                  ? 'ring-2 ' + theme.Ring400
                  : '',
              ]"
              :data-day="day"
              @click.prevent="inp"
            >
              <div
                class="flex flex-col justify-center items-center pointer-events-none py-1"
              >
                <span>{{ locale === 'Jalali' ? day : day }}</span>
                <span class="text-xs font-normal" v-if="size !== 'sm'">
                  {{ getPrice(day) }}
                </span>
                <span
                  v-if="getFDays(day) > 0 && size === 'showMeDaysToo'"
                  class="text-xs font-normal"
                >
                  {{ getFDays(day) }} روز
                </span>
              </div>
              <div
                class="absolute bottom-0 right-0 translate-x-2 translate-y-2 w-4 h-4 rotate-45 transform"
                :class="[
                  isDisabled(day)
                    ? ''
                    : getBadgeBR(day)
                    ? 'badge-' + getBadgeBR(day)
                    : !isDisabled(day) && !isFridayOrThursday(day)
                    ? ''
                    : !isDisabled(day) && isFridayOrThursday(day)
                    ? 'badge-red'
                    : '',
                ]"
              ></div>
              <div
                class="absolute top-0 right-0 translate-x-2 -translate-y-2 w-4 h-4 rotate-45 transform"
                :class="[
                  isDisabled(day)
                    ? ''
                    : getBadgeTR(day)
                    ? 'badge-' + getBadgeTR(day)
                    : '',
                ]"
              ></div>
            </button>
          </div>
          <!-- <div class="h-16 w-full pl-1">
            <div class="rounded bg-indigo-100 w-full h-full"></div>
          </div>
          <div class="h-16 w-full pl-1">
            <div class="rounded bg-indigo-100 w-full h-full"></div>
          </div> -->
        </div>

        <!-- <div class="flex flex-wrap dp-my-3 dp-mx-3">
          <button
            class="
              dp-bg-green-400
              dp-text-white
              dp-p-2
              dp-rounded-xl
              dp-font-bold
              dp-text-sm
              dp-mx-1
              outline-none
              dp-focus:outline-none
            "
            @click="gotoToday"
          >
            {{ locale === 'Jalali' ? 'امروز' : 'Today' }}
          </button>
          <button
            v-if="dateModel.type === 'multiple'"
            class="
              dp-bg-red-400
              dp-text-white
              dp-p-2
              dp-rounded-xl
              dp-font-bold
              dp-text-sm
              dp-mx-1
              outline-none
              dp-focus:outline-none
            "
            @click="addMonth"
          >
            {{ locale === 'Jalali' ? 'انتخاب ماه' : 'select This Month' }}
          </button>
        </div> -->
      </div>
    </div>
    <div
      v-if="debugSelector"
      class="flex w-full dp-rounded dp-my-3 dp-bg-white dp-p-3 flex justify-around"
    >
      <label>
        <input
          id="single"
          v-model="inputType"
          class="m-2"
          type="radio"
          :name="'selectortype' + lang"
          value="single"
          @change="handleInputtypeChange"
        />
        single
      </label>
      <label>
        <input
          id="multiple"
          v-model="inputType"
          class="m-2"
          type="radio"
          :name="'selectortype' + lang"
          value="multiple"
          @change="handleInputtypeChange"
        />
        multiple
      </label>
      <label>
        <input
          id="range"
          v-model="inputType"
          class="m-2"
          type="radio"
          :name="'selectortype' + lang"
          value="range"
          @change="handleInputtypeChange"
        />
        range
      </label>
    </div>
  </div>
</template>

<script>
  import toolkit from './toolkit.js'
  const defineComponent = (p) => p
  export default defineComponent({
    props: {
      date: { type: Object },
      lang: { type: String },
      type: { type: String },
      debugSelector: { type: Boolean, default: true },
      colorTheme: { type: String },
      preSelectedModel: { type: Object },
      holidayMap: { type: Object },
      disabledMap: { type: Object },
      events: { type: Array },
      forwardLimit: { type: Object },
      backwardLimit: { type: Object },
      selectable: { type: Object },
      days: { type: Array },
      enableAllDays: Boolean,
      size: { default: 'sm' },
      defPrice: { type: Number },
      holidayPrice: { type: Number },
    },
    // setup(props, ctx) {
    //   const dmHandle = (t) => {
    //     ctx.emit('datemodel', t)
    //     ctx.emit('update:modelValue', t)
    //   }
    //   return { dmHandle, toolkit }
    // },
    data() {
      return {
        toolkit,
        inpday: null,
        Settings: {
          Jalali: {
            monthNames: [
              'فروردین',
              'اردیبهشت',
              'خرداد',
              'تیر',
              'مرداد',
              'شهریور',
              'مهر',
              'آبان',
              'آذر',
              'دی',
              'بهمن',
              'اسفند',
            ],
            WD: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
            setup: [0, 1, 2, 3, 4, 5, 6],
            persianNumeric: ['', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
          },
          Greg: {
            WD: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            setup: [0, 1, 2, 3, 4, 5, 6],
          },
        },
        TextColors: {
          red: 'text-red-500',
          green: 'text-green-700',
          yellow: 'text-yellow-500',
          black: 'text-gray-700',
        },
        prevMap: [1, 2, 3, 4, 5, 6, 0],
        nextMap: [6, 5, 4, 3, 2, 1, 0],
        month: {},
        inputType: null,
        dateModel: {},
        selectedDateModel: {},

        selectedDateMap: {},
        eventsMap: {},
        isSelectableMap: {},
        animationIn: '',
        animationDirection: '',
        changeKey: 0.1,
        dateselected: {},
        daysMap: {},
        NextUnselectable: {},
        notSelectable: [],
      }
    },
    computed: {
      theme() {
        const defaultTheme = {
          Bg400: 'dp-bg-primary',
          Text500: 'dp-text-primary',
          Ring400: '',
          DCHover: 'bg-indigo-100',
        }

        let theme = defaultTheme

        if (this.colorTheme === 'yellow' || this.colorTheme === 'Yellow') {
          theme = defaultTheme
        }

        if (this.colorTheme === 'pink' || this.colorTheme === 'Pink') {
          theme = {
            Bg400: 'dp-bg-pink-400 text-white',
            Text500: 'dp-text-pink-500',
            Ring400: 'dp-ring-pink-400',
            DCHover: 'days-curr-pink',
          }
        }
        return theme
      },
      now() {
        if (this.locale === 'Jalali') {
          return this.toolkit.now()
        } else {
          const now = new Date()
          return {
            year: now.getFullYear(),
            month: now.getMonth(),
            date: now.getDate(),
          }
        }
      },

      prevCounter() {
        return this.prevMap[
        (7 + (this.thisMonth.prev.LWDM - this.thisMonth.settings[0])) % 7
          ]
      },
      nextCounter() {
        return this.nextMap[
        (7 + (this.thisMonth.current.LWDM - this.thisMonth.settings[0])) % 7
          ]
      },
      thisMonth() {
        let today, curr, prev, cal
        if (this.locale === 'Jalali') {
          const meta = this.toolkit.getMeta(this.month)
          cal = {
            prev: { LD: meta.prevLD, LWDM: meta.prevLWD },
            current: {
              month: this.month.month,
              monthSTD: this.month.month,
              LD: meta.currLD,
              LWDM: meta.currLWD,
              year: this.month.year,
              monthName: this.Settings.Jalali.monthNames[this.month.month - 1],
            },
            settings: this.Settings[this.locale].setup,
          }
        } else {
          today = this.month
          curr = new Date(today.year, today.month + 1, 0)
          prev = new Date(today.year, today.month, 0)
          cal = {
            prev: { LD: prev.getDate(), LWDM: prev.getDay() },
            current: {
              month: curr.getMonth(),
              monthSTD: curr.getMonth() + 1,
              LD: curr.getDate(),
              LWDM: curr.getDay(),
              year: curr.getFullYear(),
              monthName: curr.toLocaleString('default', { month: 'long' }),
            },
            settings: this.Settings[this.locale].setup,
          }
        }

        return cal
      },
      locale() {
        return this.lang === 'Jalali' ? 'Jalali' : 'Greg'
      },
      shouldApplyRangeLimit() {
        // console.log(
        //   this.dateModel?.type === 'range' || this.inputType === 'range',
        //   this.dateModel?.dates?.length === 1
        // )
        return (
          (this.dateModel?.type === 'range' || this.inputType === 'range') &&
          this.dateModel?.dates?.length === 1
        )
      },
      selectedCount() {
        return this.dateModel?.dates?.length
      },
    },
    watch: {
      inputType() {
        this.dateModel = { type: this.inputType, dates: [] }
      },
      dateModel() {
        // this.dmHandle(this.dateModel)
        // console.log('two dates selected ', this.dateModel)
        if (this.selectedCount === 2) {
          // console.log('two dates selected ', this.dateModel)
          this.$emit('dpready')
          this.$emit(
            'allRange',
            this.getAllSelectedRange(
              this.dateModel?.dates[0],
              this.dateModel?.dates[1]
            )
          )
        }
        this.$emit('datemodel', this.dateModel)
        this.dmHandle(this.dateModel)

        // this.$emit('datemodel', this.dateModel)
      },
      dateselected() {
        this.handleDateSelected(this.dateselected)
      },
      month() {
        this.changeKey = Math.random()
      },
    },
    created() {
      this.month = this.now
    },
    mounted() {
      this.month = this.now
      // this.$on('dateselected', this.handleDateSelected)
      this.inputType = this.preSelectedModel?.type || this.type || 'single'

      this.dateModel = this.preSelectedModel || {}

      this.calcSelected()
      this.calcMapEvents()
      this.calcMapSelectable()
      const DaysMap = this.mapArr(this.days)
      this.daysMap = DaysMap[0]
      this.notSelectable = DaysMap[1]
      if (this.type === 'range') {
        this.inputType = 'single'
        this.inputType = 'range'
      }
    },
    methods: {
      isDisabled(day) {
        const shouldApplyRangeLimit = this.shouldApplyRangeLimit
        return (
          (!shouldApplyRangeLimit &&
            this.isUnselectable(day) &&
            !(this.enableAllDays && !this.isDefined(day))) ||
          (shouldApplyRangeLimit && !this.isInrangeOfUnselectable(day))
        )
      },
      dmHandle(t) {
        // this.$emit('datemodel', { t })
        // this.$emit('update:modelValue', t)
        // console.log('dmhandle')
        if (this.dateModel?.dates.length === 2) {
          // console.log('all range ', this.dateModel)
          this.$emit('dpready')
          const allrange = this.getAllSelectedRange(
            this.dateModel?.dates[0],
            this.dateModel?.dates[1]
          )
          this.$emit('allrange', allrange)
        }
      },
      dPickHandle(event) {
        this.inpday = parseInt(event.target.textContent)
      },
      NextMonth() {
        this.animationDirection =
          this.locale === 'Jalali' ? 'direction-prev' : 'direction-next'

        this.month = this.toolkit.nextMonth(this.month)
      },
      PrevMonth() {
        this.animationDirection =
          this.locale === 'Jalali' ? 'direction-next' : 'direction-prev'
        this.month = this.toolkit.prevMonth(this.month)
      },
      normalizeDate(dateObj) {
        return {
          year: Number.parseInt(dateObj?.year),
          month: Number.parseInt(dateObj?.month),
          date: Number.parseInt(dateObj?.date),
        }
      },
      handleDateSelected(event) {
        const normalized = this.normalizeDate(event)
        // let dateModel = this.dateModel

        if (
          this.selectedDateMap?.[normalized?.year]?.[normalized?.month]?.[
            normalized?.date
            ]
        ) {
          const arr = this.dateModel.dates.filter((el) => {
            el = this.normalizeDate(el)

            return (
              !(
                el?.year === normalized?.year &&
                el?.month === normalized?.month &&
                el?.date === normalized?.date
              ) || event.all
            )
          })
          this.dateModel.dates = arr
        } else {
          switch (this.inputType) {
            case 'single':
              this.dateModel = {
                type: 'single',
                dates: [normalized],
              }
              break
            case 'range':
              if (this.dateModel) this.dateModel.type = 'range'
              if (this.dateModel?.dates?.length === 1) {
                this.dateModel.dates.push(normalized)
              } else {
                this.dateModel.dates = [normalized]
              }
              break
            case 'multiple':
              if (!this.dateModel.dates) {
                this.dateModel = {
                  type: 'multiple',
                  dates: [],
                }
              }
              this.dateModel?.dates && this.dateModel.dates.push(normalized)
          }
        }
        // this.dateModel = dateModel
        this.calcSelected()
      },
      isHoliday(day) {
        const thisMonth = this.thisMonth

        return (
          !!this.daysMap?.[thisMonth.current.year]?.[
            thisMonth.current.monthSTD
            ]?.[day]?.holiday ||
          ((thisMonth.prev.LWDM + day + 1) % 7 === 0 && this.locale === 'Jalali')
        )
      },
      isFridayOrThursday(day) {
        const thisMonth = this.thisMonth

        return (
          !!this.daysMap?.[thisMonth.current.year]?.[
            thisMonth.current.monthSTD
            ]?.[day]?.holiday ||
          (((thisMonth.prev.LWDM + day + 1) % 7 === 0 ||
            (thisMonth.prev.LWDM + day + 1) % 7 === 6) &&
            this.locale === 'Jalali')
        )
      },
      calcSelected() {
        const dateModel = this.dateModel
        if (dateModel?.dates) {
          const map = {}
          for (let i = 0; i < dateModel.dates.length; i++) {
            const year = dateModel.dates[i].year
            const month = dateModel.dates[i].month
            const date = dateModel.dates[i].date
            if (!map[year]) {
              map[year] = {}
            }
            if (!map[year]?.[month]) {
              map[year][month] = {}
            }
            if (!map.year?.month?.date) {
              map[year][month][date] = true
            }
          }

          this.selectedDateMap = map
        }
      },
      calcMapEvents() {
        const model = this.events
        if (model) {
          const map = {}
          for (let i = 0; i < model.length; i++) {
            const year = model[i].year
            const month = model[i].month
            const date = model[i].date
            const count = model[i].count
            const color = model[i].color
            if (!map[year]) {
              map[year] = {}
            }
            if (!map[year]?.[month]) {
              map[year][month] = {}
            }
            if (!map.year?.month?.date) {
              map[year][month][date] = {}
            }
            map[year][month][date] = { count, color }
          }
          this.eventsMap = map
        }
      },
      calcMapSelectable() {
        const model = this.selectable
        if (model) {
          const map = {}
          for (let i = 0; i < model.dates?.length; i++) {
            const year = model.dates?.[i].year
            const month = model.dates?.[i].month
            const date = model.dates?.[i].date

            if (!map[year]) {
              map[year] = {}
            }
            if (!map[year]?.[month]) {
              map[year][month] = {}
            }
            if (!map.year?.month?.date) {
              map[year][month][date] = true
            }
          }

          this.isSelectableMap = map
        }
      },

      isEvent(day) {
        const thisMonth = this.thisMonth

        return !!this.eventsMap?.[thisMonth.current.year]?.[
          thisMonth.current.monthSTD
          ]?.[day]
      },
      isSelected(day) {
        const thisMonth = this.thisMonth

        return !!this.selectedDateMap?.[thisMonth.current.year]?.[
          thisMonth.current.monthSTD
          ]?.[day]
      },

      isUnselectable(day) {
        const thisMonth = this.thisMonth
        // const d = day
        const t =
          this.daysMap?.[thisMonth.current.year]?.[thisMonth.current.monthSTD]
        // console.log(t?.[day]?.selectable)
        return !t?.[day]?.selectable
      },
      isRangeSelectable(day) {
        const now = new Date(
          this.thisMonth.current.year,
          this.thisMonth.current.monthSTD,
          day
        )
        let f, s
        let fD = new Date(f.year, f.month, f.date)
        let sD = new Date(s.year, s.month, s.date)
        if (sD < fD) {
          const t = fD
          fD = sD
          sD = t
        }

        return {
          value: fD < now && now < sD,
          // isFirstDay: +fD === +now,
          // isLastDay: +sD === +now,
        }
      },
      isInrange(day) {
        if (
          this.dateModel?.type === 'range' &&
          this.dateModel?.dates.length === 2
        ) {
          const thisMonth = this.thisMonth
          const now = new Date(
            thisMonth.current.year,
            thisMonth.current.monthSTD,
            day
          )
          const f = this.normalizeDate(this.dateModel?.dates?.[0])
          const s = this.normalizeDate(this.dateModel?.dates?.[1])
          let fD = new Date(f.year, f.month, f.date)
          let sD = new Date(s.year, s.month, s.date)
          if (sD < fD) {
            const t = fD
            fD = sD
            sD = t
          }

          return {
            value: fD < now && now < sD,
            isFirstDay: +fD === +now,
            isLastDay: +sD === +now,
          }
        }

        return {
          value: false,
          isFirstDay: false,
          isLastDay: false,
        }
      },
      inp(event) {
        // console.log(event, this.selectedCount)
        this.inpday =
          parseInt(event.target?.attributes?.['data-day']?.value) ||
          parseInt(event.target.value)

        const day = this.inpday // ? this.inpday : 1
        // console.log(day)
        const m = this.thisMonth.current.monthSTD

        this.dateselected = {
          year: this.thisMonth.current.year,
          month: m,
          date: day,
        }
        // console.log({
        //   year: this.thisMonth.current.year,
        //   month: m,
        //   date: day,
        // })

        this.NextUnselectable = this.getNextUnselectable({
          year: this.thisMonth.current.year,
          month: m,
          date: day,
        })
        if (this.selectedCount === 1) {
          const all = this.getAllSelectedRange(
            this.dateModel?.dates[0],
            this.dateselected
          )
          // console.log('allRange', all)
          this.$emit('allrange', all)
          return all
        }
        return '' + this.thisMonth.current.year + '/' + m + '/' + day
      },
      handleInputtypeChange() {
        this.dateModel = { type: this.inputType, dates: [] }
        this.calcSelected()
      },
      getEventCount(day) {
        const thisMonth = this.thisMonth
        return this.eventsMap?.[thisMonth.current.year]?.[
          thisMonth.current.monthSTD
          ]?.[day]?.count
      },
      getEventColor(day) {
        const thisMonth = this.thisMonth
        return this.eventsMap?.[thisMonth.current.year]?.[
          thisMonth.current.monthSTD
          ]?.[day]?.color
      },
      getPersianNumeric(day) {
        let str = ''
        if ((typeof str === 'string', typeof day === 'number')) {
          const nums = this.Settings.Jalali.persianNumeric
          str = day.toString()

          for (let i = 0; i < str.length; i++) {
            let num = Number.parseInt(str[i])
            num = nums[num]
            str = str.slice(0, i) + num + str.slice(i + 1)
          }
        }
        return str
      },
      isSelectable() {
        return true
      },
      addMonth() {
        for (let i = 1; i <= this.thisMonth.current.LD; i++) {
          if (this.isSelectable(i)) {
            this.handleDateSelected({
              year: this.month.year,
              month: this.thisMonth.current.monthSTD,
              date: i,
              all: true,
            })
          }
        }
      },
      gotoToday() {
        this.month = this.now
      },
      isForwardLimit() {
        const limit = this.forwardLimit
        const next = this.toolkit.nextMonth(this.month)
        if (limit) {
          if (next.year > limit.year) {
            return false
          }
          if (next.year === limit.year && next.month > limit.month) {
            return false
          }
        }
        return true
      },
      isBackwardLimit() {
        const limit = this.backwardLimit
        const prev = this.toolkit.prevMonth(this.month)

        if (limit) {
          if (prev.year < limit.year) {
            return false
          }
          if (prev.year === limit.year && prev.month < limit.month) {
            return false
          }
        }
        return true
      },
      isToday(day) {
        const now = new Date()
        const nowJalali = this.toolkit.getJalali(now)

        return (
          (nowJalali.year === this.thisMonth.current.year &&
            nowJalali.month === this.thisMonth.current.monthSTD &&
            nowJalali.date === day) ||
          (now.getFullYear() === this.thisMonth.current.year &&
            now.getMonth() + 1 === this.thisMonth.current.monthSTD &&
            now.getDate() === day)
        )
      },
      str2date(str) {
        const strarr = str.split('-')
        return {
          year: parseInt(strarr[0]),
          month: parseInt(strarr[1]),
          date: parseInt(strarr[2]),
        }
      },
      mapArr(arr) {
        const model = arr
        const notSelectable = { daysTimestamps: [], map: {} }
        if (model) {
          const map = {}

          for (let i = 0; i < model.length; i++) {
            if (!model[i].selectable) {
              const nsday = this.getDayCounter(
                this.normalizeDate(this.str2date(model[i].date))
              )
              notSelectable.daysTimestamps.push(nsday)
              notSelectable.map[nsday] = model[i]
            }

            const normalDate = this.str2date(model[i].date)
            const { year, month, date } = normalDate
            if (!map[year]) {
              map[year] = {}
            }
            if (!map[year]?.[month]) {
              map[year][month] = {}
            }
            if (!map?.[year]?.[month]?.[date]) {
              map[year][month][date] = model[i]
            }
          }
          notSelectable.daysTimestamps.sort()

          return [map, notSelectable]
        }
        return {}
      },
      dayProps(day) {
        return this.daysMap?.[this.thisMonth.current.year]?.[
          this.thisMonth.current.monthSTD
          ]?.[day]
      },
      getAllSelectedRange(start, end) {
        if (
          start.year >= end.year &&
          start.month >= end.month &&
          start.date >= end.date
        ) {
          //  console.log('start', start, 'end', end)
          return 2
        }
        let monthToCheck = start
        const selectedDays = []
        monthToCheck.monthLD = toolkit.getLastDayOfMonth(monthToCheck)
        // console.log(monthToCheck)
        let counter = 0
        for (let i = monthToCheck.date; i <= 32 && counter < 60; i) {
          const normalizedDate = {
            year: monthToCheck.year,
            month: monthToCheck.month,
            date: i,
          }
          const dayData =
            this.daysMap?.[normalizedDate.year]?.[normalizedDate.month]?.[
              normalizedDate.date
              ]
          // console.log(dayData)
          if (dayData?.date) {
            normalizedDate.meta = {}
            normalizedDate.meta = dayData
          }
          selectedDays.push({
            ...normalizedDate,
          })
          if (
            monthToCheck.year === end.year &&
            monthToCheck.month === end.month &&
            i === end.date
          ) {
            return selectedDays
          }
          if (i === monthToCheck.monthLD) {
            monthToCheck = toolkit.nextMonth(monthToCheck)
            monthToCheck.monthLD = toolkit.getMeta(monthToCheck).currLD
            i = 1
            counter++
            continue
          }
          i++
          counter++
        }

        return selectedDays
      },
      // getNextUnselectable(dateModel) {
      //   let monthToCheck = dateModel
      //   // console.log(monthToCheck, dateModel)
      //   if (!monthToCheck) {
      //     return null
      //   }

      //   monthToCheck.monthLD = toolkit.getLastDayOfMonth(monthToCheck)
      //   console.log(monthToCheck, dateModel)

      //   let checkCounter = monthToCheck.date
      //   console.log(
      //     checkCounter,
      //     !this.daysMap?.[monthToCheck.year]?.[monthToCheck.month]?.[checkCounter]
      //       ?.selectable
      //   )
      //   for (let i = 0; i <= this.days.length; i++) {
      //     console.log(checkCounter)
      //     if (
      //       !this.daysMap?.[monthToCheck.year]?.[monthToCheck.month]?.[
      //         checkCounter
      //       ]?.selectable
      //     ) {
      //       const r = monthToCheck
      //       r.date = checkCounter

      //       return r
      //     }
      //     if (checkCounter.date === monthToCheck.monthLD) {
      //       monthToCheck = toolkit.nextMonth(monthToCheck)
      //       monthToCheck.monthLD = toolkit.getMeta(monthToCheck).currLD
      //       console.log(monthToCheck)
      //       checkCounter = 1
      //       break
      //     }
      //     checkCounter++
      //   }

      //   return null
      // },
      getNextUnselectable(dateModel) {
        const dateToCheck = dateModel
        const todayDC = this.getDayCounter(dateToCheck)
        const notSelectableTimeStamps = this.notSelectable.daysTimestamps
        for (let i = 0; i < notSelectableTimeStamps.length; i++) {
          const dayCounter = notSelectableTimeStamps[i]
          // console.log(
          //   'check if today is not selectable',
          //   todayDC,
          //   dayCounter,
          //   notSelectableTimeStamps[i]
          // )
          if (dayCounter >= todayDC) {
            return this.normalizeDate(
              this.str2date(this.notSelectable.map[dayCounter].date)
            )
          }
        }
        return {
          year: this.thisMonth.current.year + 1,
          month: this.thisMonth.current.monthSTD,
          date: this.thisMonth.current.LD,
        }
      },
      getDayCounter(dateModel) {
        const { year, month, date } = dateModel
        return year * 366 + month * 31 + date
      },
      // isInrangeOfUnselectable(day) {
      //   // const isdefined =
      //   //   this.daysMap?.[this.thisMonth.current.year]?.[
      //   //     this.thisMonth.current.monthSTD
      //   //   ]?.[day]
      //   // console.log(day, isdefined)
      //   if (
      //     this.dateModel?.type === 'range' &&
      //     this.dateModel?.dates.length === 1
      //   ) {
      //     const thisMonth = this.thisMonth
      //     const now = new Date(
      //       thisMonth.current.year,
      //       thisMonth.current.monthSTD,
      //       day
      //     )
      //     const f = this.normalizeDate(this.dateModel?.dates?.[0])
      //     const s = this.normalizeDate(this.NextUnselectable)
      //     let fD = new Date(f.year, f.month, f.date)
      //     let sD = new Date(s.year, s.month, s.date)
      //     if (sD < fD) {
      //       const t = fD
      //       fD = sD
      //       sD = t
      //     }
      //     // console.log('isInrangeOfUnselectable', day, {
      //     //   value: (fD < now && now < sD) || +sD === +now || +fD === +now,
      //     //   isFirstDay: +fD === +now,
      //     //   isLastDay: +sD === +now,
      //     // })
      //     // console.log(fD < now && now < sD, +sD === +now, +fD === +now)
      //     console.log(+now, +fD, +sD)
      //     return (fD < now && now < sD) || +sD === +now || +fD === +now
      //   }
      //   return false
      // },
      isInrangeOfUnselectable(day) {
        const thisMonth = this.thisMonth
        const fD = this.getDayCounter(
          this.normalizeDate(this.dateModel?.dates?.[0])
        )
        const sD = this.getDayCounter(this.normalizeDate(this.NextUnselectable))
        const dayCounter = this.getDayCounter({
          year: thisMonth.current.year,
          month: thisMonth.current.monthSTD,
          date: day,
        })
        // console.log(
        //   fD < dayCounter && dayCounter < sD,
        //   +sD === +dayCounter,
        //   +fD === +dayCounter
        // )
        return (
          (fD < dayCounter && dayCounter < sD) ||
          +sD === +dayCounter ||
          +fD === +dayCounter
        )
      },
      getPrice(day) {
        const weekday = (this.prevCounter + day) % 7
        if (
          !this.daysMap?.[this.thisMonth.current.year]?.[
            this.thisMonth.current.monthSTD
            ]?.[day]?.price
        ) {
          if (weekday === 6 || weekday === 0) {
            return this.holidayPrice
          }
          return this.defPrice
        }
        return this.daysMap?.[this.thisMonth.current.year]?.[
          this.thisMonth.current.monthSTD
          ]?.[day]?.price
      },
      getFDays(day) {
        return this.daysMap?.[this.thisMonth.current.year]?.[
          this.thisMonth.current.monthSTD
          ]?.[day]?.fDays
      },
      getTextColor(day) {
        const t =
          this.daysMap?.[this.thisMonth.current.year]?.[
            this.thisMonth.current.monthSTD
            ]?.[day]?.color
        return this.TextColors[t] ? this.TextColors[t] : 'dp-text-primary'
      },
      getDayColor(day) {
        const t =
          this.daysMap?.[this.thisMonth.current.year]?.[
            this.thisMonth.current.monthSTD
            ]?.[day]?.color
        return t
      },

      isDefined(day) {
        return this.daysMap?.[this.thisMonth.current.year]?.[
          this.thisMonth.current.monthSTD
          ]?.[day]
      },
      getBadgeBR(day) {
        return this.daysMap?.[this.thisMonth.current.year]?.[
          this.thisMonth.current.monthSTD
          ]?.[day]?.badgeBR
      },
      getBadgeTR(day) {
        return this.daysMap?.[this.thisMonth.current.year]?.[
          this.thisMonth.current.monthSTD
          ]?.[day]?.badgeTR
      },
    },
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wraper {
    font-family: iranyekan, 'Vazir';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;
  }
  .wraper * {
    font-family: iranyekan;
  }
  .border {
    height: auto;
    width: 2rem;
  }
  .datepicker {
    width: 24rem;
    height: auto;
    /* --ttw-bg-opacity: 1; */
    /* background-color: rgba(249, 250, 251, var(--ttw-bg-opacity)); */
    border: 1px black;
    display: flex;
    flex-direction: column;
    border-radius: 0.125rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .dp-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0.75rem;
    padding-left: 2.1rem;
    padding-right: 1.3rem;
    position: relative;
    width: 100%;
  }
  .calander {
    width: 90%;
  }
  .calendar {
    direction: ltr;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .dp-main {
    height: 13rem;
    overflow: hidden;
    padding-right: 0.25rem;
    position: relative;
    width: 100%;
  }
  .dp-main-inner {
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
  }

  .inrow {
    font-size: 0.85rem;
    font-weight: 300;
    flex: 1 0 21%;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .days {
    flex: 0 0 14%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dp-bg-secondary {
    background-color: rgb(233, 235, 244);
  }
  .dp-bg-primary {
    background-color: #3748a3;
  }
  .dp-text-primary {
    color: #3748a3;
  }

  .dp-bt-m {
    cursor: pointer;
    font-weight: 500;
    height: 2rem;
    position: relative;
    --ttw-text-opacity: 1;
    color: rgba(17, 24, 39, var(--ttw-text-opacity));
  }
  .dp-si {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    direction: ltr;

    font-size: 100%;
    text-transform: none;
    line-height: inherit;
    cursor: pointer;
    font-weight: 500;
    --ttw-text-opacity: 1;
    color: rgba(17, 24, 39, var(--ttw-text-opacity));
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    --ttw-shadow: 0 0 #0000;
    --ttw-ring-inset: var(--ttw-empty, /*!*/ /*!*/);
    --ttw-ring-offset-width: 0px;
    --ttw-ring-offset-color: #fff;
    --ttw-ring-color: rgba(59, 130, 246, 0.5);
    --ttw-ring-offset-shadow: 0 0 #0000;
    --ttw-ring-shadow: 0 0 #0000;
    --ttw-bg-opacity: 0.7;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.75rem;
    pointer-events: none;
    width: 1.75rem;
  }
  .dp-sii {
    display: flex;
    position: absolute;
    left: 50%;
    --ttw-translate-y: 0;
    --ttw-rotate: 0;
    --ttw-skew-x: 0;
    --ttw-skew-y: 0;
    --ttw-scale-x: 1;
    --ttw-scale-y: 1;
    transform: translateX(var(--ttw-translate-x))
    translateY(var(--ttw-translate-y)) rotate(var(--ttw-rotate))
    skewX(var(--ttw-skew-x)) skewY(var(--ttw-skew-y)) scaleX(var(--ttw-scale-x))
    scaleY(var(--ttw-scale-y));
    --ttw-translate-x: -50%;
  }
  .days:focus {
    outline: none;
  }
  .days-curr-yellow:hover span {
    --ttw-bg-opacity: 1;
    background-color: rgba(252, 211, 77, var(--ttw-bg-opacity));
  }
  .days-curr-yellow:focus {
    outline: none;
  }
  .days-curr-pink:hover span {
    --ttw-bg-opacity: 1;
    background-color: rgba(249, 168, 212, var(--ttw-bg-opacity));
  }
  .days-curr-pink:focus {
    outline: none;
  }

  .btn {
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
  }
  .rtl {
    direction: rtl;
  }
  .flipH {
    display: block;
    transform: scale(-1, 1);
  }
  .inp {
    width: 18rem;
    height: 2rem;
    text-align: center;
    border-radius: 0.375rem;
    margin-top: 0.75rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  .day-selected {
    opacity: 1;
    /*  background-color: rgba(110, 231, 183, 1); */
  }
  .day-selected:hover {
    --ttw-bg-opacity: 1;
    background-color: rgba(252, 211, 77, var(--ttw-bg-opacity));
  }
  .day-selected span {
    background-color: transparent;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .slideX-enter,
  .slideX-leave-to {
    opacity: 0;
  }
  .direction-next .slideX-leave-to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  .direction-next .slideX-enter,
  .direction-prev .slideX-leave-to {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  .direction-prev .slideX-enter {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  .slideX-enter-active,
  .slideX-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  /* */

  .dp-text-white {
    --ttw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--ttw-text-opacity));
  }
  .dp-text-gray-300 {
    --ttw-text-opacity: 1;
    color: rgba(209, 213, 219, var(--ttw-text-opacity));
  }
  .dp-text-gray-900 {
    --ttw-text-opacity: 1;
    color: rgba(17, 24, 39, var(--ttw-text-opacity));
  }
  .dp-text-yellow-500 {
    --ttw-text-opacity: 1;
    color: rgba(245, 158, 11, var(--ttw-text-opacity));
  }
  .dp-text-pink-500 {
    --ttw-text-opacity: 1;
    color: rgba(236, 72, 153, var(--ttw-text-opacity));
  }

  .dp-text-red-400 {
    --ttw-text-opacity: 1;
    color: rgba(248, 113, 113, var(--ttw-text-opacity));
  }

  .dp-text-gray-800 {
    --ttw-text-opacity: 1;
    color: rgba(31, 41, 55, var(--ttw-text-opacity));
  }

  .dp-bg-transparent {
    background-color: transparent;
  }

  .dp-bg-white {
    --ttw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--ttw-bg-opacity));
  }

  .dp-bg-gray-100 {
    --ttw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--ttw-bg-opacity));
  }

  .dp-bg-gray-400 {
    --ttw-bg-opacity: 1;
    background-color: rgba(156, 163, 175, var(--ttw-bg-opacity));
  }

  .dp-bg-red-300 {
    --ttw-bg-opacity: 1;
    background-color: rgba(252, 165, 165, var(--ttw-bg-opacity));
  }

  .dp-bg-red-400 {
    --ttw-bg-opacity: 1;
    background-color: rgba(248, 113, 113, var(--ttw-bg-opacity));
  }

  .dp-bg-yellow-400 {
    --ttw-bg-opacity: 1;
    background-color: rgba(251, 191, 36, var(--ttw-bg-opacity));
  }
  .dp-bg-pink-400 {
    --ttw-bg-opacity: 1;
    background-color: rgba(244, 114, 182, var(--ttw-bg-opacity));
  }
  .dp-bg-green-400 {
    --ttw-bg-opacity: 1;
    background-color: rgba(52, 211, 153, var(--ttw-bg-opacity));
  }

  .dp-group:hover .group-hover\:bg-transparent {
    background-color: transparent;
  }

  .dp-bg-opacity-70 {
    --ttw-bg-opacity: 0.7;
  }
  .ring-2 {
    --ttw-ring-offset-shadow: var(--ttw-ring-inset) 0 0 0
    var(--ttw-ring-offset-width) var(--ttw-ring-offset-color);
    --ttw-ring-shadow: var(--ttw-ring-inset) 0 0 0
    calc(2px + var(--ttw-ring-offset-width)) var(--ttw-ring-color);
    box-shadow: var(--ttw-ring-offset-shadow), var(--ttw-ring-shadow),
    0 0 transparent;
    box-shadow: var(--ttw-ring-offset-shadow), var(--ttw-ring-shadow),
    var(--ttw-shadow, 0 0 transparent);
  }
  .dp-ring-yellow-400 {
    --ttw-ring-opacity: 1;
    --ttw-ring-color: rgba(251, 191, 36, var(--ttw-ring-opacity));
  }
  .dp-ring-pink-400 {
    --ttw-ring-opacity: 1;
    --ttw-ring-color: rgba(244, 114, 182, var(--ttw-ring-opacity));
  }
  .flex {
    display: flex;
  }

  .table {
    display: table;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .items-center {
    align-items: center;
  }

  .content-center {
    align-content: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .justify-around {
    justify-content: space-around;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .dp-font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  }

  .dp-font-medium {
    font-weight: 500;
  }

  .dp-font-bold {
    font-weight: 700;
  }

  .dp-h-3 {
    height: 0.75rem;
  }

  .dp-h-6 {
    height: 1.5rem;
  }

  .dp-h-7 {
    height: 1.75rem;
  }

  .dp-h-8 {
    height: 2rem;
  }

  .dp-h-10 {
    height: 2.5rem;
  }

  .dp-h-12 {
    height: 3rem;
  }
  .dp-dh-sm {
    height: 3rem;
  }
  .dp-dh-md {
    height: 4rem;
  }
  .dp-dh-lg {
    height: 5rem;
  }
  .dp-h-52 {
    height: 13rem;
  }
  .dp-w-sm {
    width: 20rem;
  }
  .dp-w-md {
    width: 20rem;
  }
  .dp-w-lg {
    width: 24rem;
  }
  .dp-h-full {
    height: 100%;
  }

  .h-screen {
    height: 100vh;
  }
  .dp-w-full {
    width: 100%;
  }
  .dp-h-full {
    height: 100%;
  }

  .dp-transform {
    --ttw-translate-x: 0;
    --ttw-translate-y: 0;
    --ttw-rotate: 0;
    --ttw-skew-x: 0;
    --ttw-skew-y: 0;
    --ttw-scale-x: 1;
    --ttw-scale-y: 1;
    transform: translateX(var(--ttw-translate-x))
    translateY(var(--ttw-translate-y)) rotate(var(--ttw-rotate))
    skewX(var(--ttw-skew-x)) skewY(var(--ttw-skew-y)) scaleX(var(--ttw-scale-x))
    scaleY(var(--ttw-scale-y));
  }

  .dp-transition {
    transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform, filter, backdrop-filter,
    -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
  .dp--translate-x-1\/2 {
    --ttw-translate-x: -50%;
  }
  .dp-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .dp-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .dp-m-2 {
    margin: 0.5rem;
  }

  .dp-mx-1 {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }

  .dp-mx-3 {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }

  .dp-my-3 {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .dp-focus\:outline-none:focus,
  .outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .dp-overflow-hidden {
    overflow: hidden;
  }

  .dp-p-2 {
    padding: 0.5rem;
  }

  .dp-p-3 {
    padding: 0.75rem;
  }

  .dp-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .dp-px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .dp-pr-1 {
    padding-right: 0.25rem;
  }

  .dp-pointer-events-none {
    pointer-events: none;
  }

  .dp-fixed {
    position: fixed;
  }

  .dp-absolute {
    position: absolute;
  }

  .dp-relative {
    position: relative;
  }

  .dp-top-0 {
    top: 0;
  }

  .dp-right-1 {
    right: 0.25rem;
  }

  .dp--bottom-1 {
    bottom: -0.25rem;
  }

  .dp-left-1\/2 {
    left: 50%;
  }

  .dp-top-1\/3 {
    top: 33.333333%;
  }
  /* */
  .dp-font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  }

  .dp-font-medium {
    font-weight: 500;
  }

  .dp-font-bold {
    font-weight: 700;
  }

  .dp-rounded-sm {
    border-radius: 0.125rem;
  }

  .dp-rounded {
    border-radius: 0.25rem;
  }

  .dp-rounded-md {
    border-radius: 0.375rem;
  }

  .dp-rounded-xl {
    border-radius: 0.75rem;
  }

  .dp-rounded-full {
    border-radius: 9999px;
  }

  .dp-border-dashed {
    border-style: dashed;
  }

  .dp-border-b {
    border-bottom-width: 1px;
  }

  /*** */
  .rounded-l-force {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }
  .rounded-r-force {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
  }
  .not-round {
    border-top-left-radius: 0rem;
    border-bottom-left-radius: 0rem;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
  }
  .gradiant-line {
    background-image: linear-gradient(
      135deg,
      #e7e7e7 10%,
      transparent 10%,
      transparent 50%,
      #e7e7e7 50%,
      #e7e7e7 60%,
      transparent 60%,
      transparent 100%
    );
    background-size: 14.14px 14.14px;
  }

  .badge-red {
    background-color: #ff4a3d;
  }
  .badge-yellow {
    background-color: #ffa24b;
  }
  .badge-green {
    background-color: #3ddf80;
  }
  .badge-blue {
    background-color: #4b99ff;
  }

  @media screen and (max-width: 468px) {
    .dp-w-lg {
      width: 100% !important;
    }
  }
</style>
