<template>
  <div class="signinEmail">
    <v-app-bar app color="#4F474E" dark prominent mb5>
      <v-toolbar-title class="flex text-center display-1">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>

    <v-container>
      <v-layout row wrap align-center>
        <v-flex style="text-align:center">
          <v-form>
            <v-card
              class="container col-lg-1"
              max-width="40%"
              style="text-align:center"
            >
              <div>
                <v-card-title class="mt-3 ml-3">
                  <!-- change color of text? -->
                  Signin With Email
                </v-card-title>
                <v-form ref="form" v-model="valid" class="mt-4 mr-7 ml-7">
                  <v-text-field
                    v-model="name"
                    label="Email"
                    class="shrink"
                    :validate="validate"
                    outlined
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :validate="validate"
                    outlined
                    width="50"
                    required
                  ></v-text-field>
                  <!-- <div class="input field">
                    <v-input
                      label="Email:"
                      id="email"
                      height="70px"
                      placeholder="Email"
                    />
                  </div> -->
                  <!-- <div class="input field">
                    <v-input
                      label="Password:"
                      id="password"
                      placeholder="Password"
                    />
                  </div> -->
                  <div>
                    <v-row>
                      <v-col class="text-left">
                        <v-btn btn color="white" class="black-text" width="55%">
                          <router-link to="/" style="text-decoration:none">
                            Back
                          </router-link>
                        </v-btn>
                      </v-col>
                      <v-col class="text-right">
                        <v-btn
                          right
                          btn
                          color="#FE5F5B"
                          class="white--text"
                          width="55%"
                        >
                          Signin
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>

                <router-link to="/class/:id">
                  click to go to class view
                </router-link>
              </div>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SigninEmail",

  data: () => ({
    title: "Open Doors English",
  }),
  function() {
    return {};
  },
};
</script>

<style></style>
