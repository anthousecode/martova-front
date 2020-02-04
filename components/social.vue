<template>
  <ul class="d-flex justify-content-around soc-group">
    <li>
      <a href="https://uk-ua.facebook.com/" target="_blank" class="soc soc-fb">
        <i class="fab fa-facebook-f">
        </i>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/?hl=ru" target="_blank" class="soc soc-insta">
        <i class="fab fa-instagram">
        </i>
      </a>
    </li>
    <li>
      <a
        href="https://accounts.google.com/AccountChooser/signinchooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser"
        target="_blank" class="soc soc-gmail">
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
