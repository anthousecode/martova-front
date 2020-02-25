<template>
  <ul class="d-flex justify-content-around soc-group">
    <li>
      <a
        @click.prevent="authInSocial('facebook')"
        href="#" class="soc soc-fb">
        <i class="fab fa-facebook-f">
        </i>
      </a>
    </li>
    <li>
      <a
        @click.prevent="authInSocial('instagram')"
        href="#" target="_blank" class="soc soc-insta">
        <i class="fab fa-instagram">
        </i>
      </a>
    </li>
    <li>
      <a
        @click.prevent="authInSocial('google')"
        href="#"
        class="soc soc-gmail">
        <i class="fab fa-google-plus-square"></i>
      </a>
    </li>
    <li>
      <a
        @click.prevent="emitOpenFormModal"
        href="#"
        class="soc soc-email">
        <i class="fas fa-envelope"></i>
      </a>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "social",
        methods: {
            emitOpenFormModal() {
                this.$emit('emitOpenFormModal');
            },
            authInSocial(socName) {
                window.location.href = `${this.$axios.defaults.baseURL}oauth/${socName}/authenticate`;
            }
        }
    }
</script>

<style scoped lang="scss">
  li {
    padding: 5px;
  }

  i {
    font-size: 22px;

    &:hover {
      transform: rotate(-20deg);
      transition: .5s ease-in-out;
    }
  }

  .soc-fb {
    color: #007bff;
  }

  .soc-insta {
    color: #e4405f;
  }

  .soc-youtube {
    color: #cd201f;
  }

  .soc-gmail {
    color: #dd4b39;
  }

  .soc-email {
    color: #f57d00;
  }
</style>
