<template>
  <main>
    <aside
      class="support-warning"
    >
      This page requires CSS Grid and display:contents to display properly in your browser.
    </aside>

    <section
      class="grid"
    >
      <!-- Date and time header information -->
      <header>
        <b-container>
          <b-row>
            <b-col
              cols="6"
              class="text-left"
            >
              <time v-html="currentDate" /> <!-- eslint-disable-line vue/no-v-html -->
            </b-col>
            <b-col
              cols="6"
              class="text-right"
            >
              <time v-html="currentTime" /> <!-- eslint-disable-line vue/no-v-html -->
            </b-col>
          </b-row>
        </b-container>
      </header>
      <!-- Laptops and Chargers -->
      <b-container>
        <b-row>
          <!-- Laptops -->
          <b-col
            class="w-50 p-4"
          >
            <!-- Laptops Heading -->
            <b-row>
              <b-col
                class="heading"
              >
                <h2>
                  <span
                    class="fa fa-laptop icon-laptop"
                    aria-hidden="true"
                  />
                  Laptops
                </h2>
              </b-col>
            </b-row>
            <!-- Laptops Data -->
            <b-row
              class="device-data"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Mac
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="available"
                >
                  1 Available
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data bg-light"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Mac (Extended Loan)
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="notavailable"
                >
                  3/15 at 4:00 p.m.
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Windows
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="available"
                >
                  1 Available
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data bg-light"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Windows (Extended Loan)
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="notavailable"
                >
                  3/15 at 4:00 p.m.
                </span>
              </b-col>
            </b-row>
          </b-col>
          <!-- Chargers -->
          <b-col
            class="w-50 p-4"
          >
            <b-row>
              <b-col
                class="heading"
              >
                <h2>
                  <span
                    class="fa fa-battery-quarter icon-charger"
                    aria-hidden="true"
                  />
                  Chargers
                </h2>
              </b-col>
            </b-row>
            <!-- Chargers Data -->
            <b-row
              class="device-data"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                iPhone 5+ (Lightning)
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="available"
                >
                  1 Available
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data bg-light"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Micro USB
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="notavailable"
                >
                  3/15 at 4:00 p.m.
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                USB-C
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="available"
                >
                  1 Available
                </span>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
      <!-- Cameras and Projectors -->
      <b-container>
        <b-row>
          <!-- Cameras -->
          <b-col
            class="w-50 p-4"
          >
            <!-- Cameras Heading -->
            <b-row>
              <b-col
                class="heading"
              >
                <h2>
                  <span
                    class="fa fa-camera icon-camera"
                    aria-hidden="true"
                  />
                  Cameras
                </h2>
              </b-col>
            </b-row>
            <!-- Cameras Data -->
            <b-row
              class="device-data"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                DSLR Cameras
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="available"
                >
                  1 Available
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data bg-light"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Telephoto Lens
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="notavailable"
                >
                  3/15 at 4:00 p.m.
                </span>
              </b-col>
            </b-row>
          </b-col>
          <!-- Projectors -->
          <b-col
            class="w-50 p-4"
          >
            <b-row>
              <b-col
                class="heading"
              >
                <h2>
                  <span
                    class="fa fa-tv icon-projector"
                    aria-hidden="true"
                  />
                  Projectors
                </h2>
              </b-col>
            </b-row>
            <!-- Projectors Data -->
            <b-row
              class="device-data"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Projectors
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="available"
                >
                  1 Available
                </span>
              </b-col>
            </b-row>
            <b-row
              class="device-data bg-light"
            >
              <b-col
                cols="7"
              >
                <span
                  class="fa fa-check-circle icon-available"
                />
                <span
                  class="fa fa-ban icon-unavailable"
                />
                Projector Screens
              </b-col>
              <b-col
                cols="5"
              >
                <span
                  class="notavailable"
                >
                  3/15 at 4:00 p.m.
                </span>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
      <!-- Text footer information -->
      <footer>
        <b-container>
          <b-row>
            <b-col
              class="text-center"
            >
              For more information about equipment, visit https://olinuris.library.cornell.edu/equipment
            </b-col>
          </b-row>
        </b-container>
      </footer>
      <!-- <Circulation location="olin" /> -->
      <!-- <Circulation location="uris" /> -->
    </section>
  </main>
</template>

<script>
// import Circulation from '~/components/Circulation'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  head () {
    return {
      bodyAttrs: {
        class: this.libraryDisplayClass
      },
      title: this.location.toUpperCase(),
      titleTemplate: '%s Signage',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700' },
        { rel: 'stylesheet', href: 'https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css' }
      ]
    }
  },
  components: {
    // 'Circulation': Circulation
  },
  data () {
    return {
      location: this.$route.params.location
    }
  },
  computed: {
    ...mapState({
      currentDate: state => moment(state.time.now).format('dddd / MMM D'),
      currentTime: state => moment(state.time.now).format('h[<span class="blink">:</span>]mm A')
    }),
    libraryDisplayClass () {
      return this.location + '-display'
    },
    laptops () {
      return this.$store.state.folioEquipment.locations.olin
    },
    chargers () {
      return this.$store.state.phoneChargers.locations
    },
    cameras () {
      return this.$store.state.laptops.locations
    },
    projectors () {
      return this.$store.state.phoneChargers.locations
    }
  },
  async fetch ({ store, params }) {
    // await store.dispatch('laptops/fetchStatus', 'olin')
    // await store.dispatch('phoneChargers/fetchStatus', 'olin')
    // await store.dispatch('laptops/fetchStatus', 'uris')
    // await store.dispatch('phoneChargers/fetchStatus', 'uris')
    await store.dispatch('folioEquipment/fetchStatus', params.location)
  },
  mounted () {
    // Sync current time every 10 seconds
    // -- ideally, this would happen within the store itself (as part of the action),
    // -- but encountered a bug when attempting this via Nuxt. No issue in vanilla Vue.
    setInterval(() => {
      this.$store.dispatch('time/sync')
    }, 1000 * 10)

    // Update equipment status every minute
    setInterval(() => {
      // this.$store.dispatch('laptops/fetchStatus', 'olin')
      // this.$store.dispatch('phoneChargers/fetchStatus', 'olin')
      // this.$store.dispatch('laptops/fetchStatus', 'uris')
      this.$store.dispatch('phoneChargers/fetchStatus', 'uris')
    }, 1000 * 60)
  }
}
</script>

<style lang="scss">
/**
 ** SUPPORT WARNING FOR BROWSERS NOT SUPPORTING display grid and contents properties.
 **/

.support-warning {
  background: red;
  color: #fff;
  display: block;
  font-weight: 700;
  opacity: 0.95;
  padding: 3rem;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
}

.support-warning a {
  color: inherit;
}

@supports (display: grid) and (display: contents) {
  .support-warning {
    display: none;
  }
}

/**
** Main styles for Olin Digital Signage
**/

main, html {
  background-color: #fff;
  color: #000;
  font-weight: bold;
  font-size: 16px;
}

.container {
  margin-top: 1em;
  max-width: 98% !important;
}

.heading {
  color: #fff;
  background-color: #000;
  padding: 1em 1.15em 0.75em;
}

.p-4 {
  padding-top: 0 !important;
}

span.fa {
  padding-right: 0.3em;
}

.device-data {
  font-size: 1.1em;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 0.85em 0.25em;
}

.fa-check-circle {
  color: #017ABC;
}

.fa-ban {
  color: #A80000;
}

.notavailable {
  color: #A80000;
}
</style>
