		</div><?php //end #content ?>
	</main>
	<?php if (is_singular('courses')) : ?>
		</div><?php //end courses non-sidebar wrapper ?>
   <div id="courses-right-sidebar" class="col m12 l3"></div>
    <?php endif; ?>
</div><?php //end #not-header-wrapper ?>
<style type="text/css">
footer a {
    text-decoration: underline
}

footer a:hover {
    color: #109fda
}
</style>
<div id="pre-footer-cta"><?php do_action('sttv_pre_footer'); ?></div>
    <footer class="z-depth-3">
        <small>©<?php echo date('Y'); ?> Supertutor Media, Inc. All Rights Reserved.</small><br/>
        <small><a href="https://supertutortv.com/terms-and-conditions">Terms & Conditions</a> | <a href="https://supertutortv.com/privacy-policy">Privacy Policy</a></small>
    </footer>
    <hr/>
</div><?php //end main-wrapper ?>
<?php sttv_get_template('_modal','html'); ?>
<?php wp_footer(); ?>
</body>
</html>