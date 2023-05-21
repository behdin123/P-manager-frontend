<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <ul class="social-icons">
                        <li><a class="facebook" href="#"></a></li>
                        <li><a class="twitter" href="#"></a></li>
                        <li><a class="instagram" href="#"></a></li>
                    </ul>
                </div>
                <div class="col-md-12">
                    <p class="mb-0">&copy; 2023 P-Manager. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

</script>

<style lang="scss" scoped>
@import "@/assets/global.scss";

footer {
    background-color: var(--primary-color);
    color: var(--tertiary-color);
    border-top: 1px solid var(--primary-color);
    padding: 20px 0;
    font-size: 14px;
}

.social-icons {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
}

.social-icons li {
    margin: 0 10px;
}

.social-icons li:first-child {
    margin-left: 0;
}

.social-icons li:last-child {
    margin-right: 0;
}

.social-icons a {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    background-size: cover;
}

.social-icons a.facebook {
    background-image: url('@/assets/facebook.svg');
}

.social-icons a.twitter {
    background-image: url('@/assets/twitter.svg');
}

.social-icons a.instagram {
    background-image: url('@/assets/instagram.svg');
}

a::before{
    transform: scaleX(0);
}

a:hover::before{
    transform: scaleX(0) !important;
}

footer p {
    margin: 0;
    text-align: center;
    margin-top: 10px;
}
</style>