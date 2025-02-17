<script>
    let x = true;
</script>

<div class="header">
    <a href="/">pinscout</a>
    <div class="right">
        {#if x}
            <a href="/dashboard">dashboard</a>
        {:else}
            <a href="/login">login</a>
        {/if}
        <a href="/settings">settings</a>
        <a href="/about">about</a>
    </div>
</div>

<style>
    .right{
        float:right;
    }
</style>