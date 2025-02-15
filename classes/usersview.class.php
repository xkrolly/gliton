	public function searchPanel(){
	  
		$panel='<div class="them" id="searchPanel" style="background:#fff; border:1px solid #ccc; filter:drop-shadow(2px 2px 150px #aaa); padding:1px; position:fixed; right:0; left:0; top:8%; z-index:20; display:none;">
				<div id="glitsearch" style="display:none;"></div>
        <form id="search_data" class="search_data">
        <div style="background:#fff; padding:10px; display:flex; align-items:center; justify-content:center;">

              <div style="border:2px solid #aaa; border-radius:20px; display:flex; justify-content:center; align-items:center;">
              <button type="submit" name="submit" tabindex=3 class="" id="search_btn" style="width:9vw;  background:transparent; border:transparent; border-top-left-radius:15px; border-bottom-left-radius:15px; padding:3px; text-align:center;">
                  <span class="material-icons" style="color:#000; font-size:30px; margin-right:2px; margin-left:5px;">&#xe8b6;</span>
              </button>
              <input type="search" id="searchInput" incremental name="search_input" placeholder="Search any solution..." aria-label="Search the pool of published practical solutions" style="padding-left:8px color:#fff; font-size:16px; width:70vw; border:transparent; background:#fff; border-bottom-right-radius:15px; border-top-right-radius:15px;">
							
							<div style="text-align:center; margin-right:10px;" onclick="document.getElementById(\'searchInput\').value=\'\';"> x </div>
           </div>
          </div>
        </form>
        </div>
        
       </div>
      <div style="padding:2px; margin-bottom:0px;">
          <span id="search_results"></span>
      </div>';
return $panel;
	}
