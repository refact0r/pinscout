<script>
    import logo from "$lib/assets/pinscout-logo.svg";

    let x = true;

</script>

<div class="position">
    <div class="header">
        <a href="/"><img src={logo} alt=""/></a>
        <div class="right">
            {#if x}
                <a class="link" href="/dashboard">dashboard</a>
            {:else}
                <a class="link" href="/login">login</a>
            {/if}
            <a class="link" href="/settings">settings</a>
            <a class="link" href="/about">about</a>
        </div>
    </div>
</div>

<style>
    .position{
        width: 100vw;
    }
    .header{
        padding: 1vh 1vh;
        background-color: rgba(255,255,255,.4);
        height: 6vh;
    }
    .right{
        float:right;
        vertical-align: auto;
    }
    img {
        height:6vh;
    }
    .link {
        padding: 0vh 2vh 0vh;
        font-size: 4vh;
    }
</style>