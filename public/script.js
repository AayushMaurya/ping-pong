$(document).ready(function () {
   var paddle = $('.paddle')
   var ball = $('#ball');
   var paddle_1 = $('#paddle1');
   var paddle_2 = $('#paddle2');
   var container1 = $('.container1');
   var restart_btn = $('#restart');

   var container_width = parseInt(container1.width());
   var container_height = parseInt(container1.height());
   var ball_height = parseInt(ball.height());
   var ball_with = parseInt(ball.width());
   var paddle_width = parseInt(paddle.width());

   var game_over = true;

   var ball_go = 'down';
   var ball_right_left = 'right';

   var top_angle = 6;
   var right_left_angle = 0;

   var move_right_p1 = false;
   var move_left_p1 = false;

   var move_left_p2 = false;
   var move_right_p2 = false;

   var bleft;
   var pleft;

   var who_won;

   // controls for players

   $(document).on('keydown', function (e) {
      var key = e.keyCode;

      if (key === 37 && move_left_p1 === false && game_over === false)
         move_left_p1 = requestAnimationFrame(left_p1);

      if (key === 39 && move_left_p1 === false && game_over === false)
         move_right_p1 = requestAnimationFrame(right_p1);

      if (key === 65 && move_left_p2 === false && game_over === false)
         move_left_p2 = requestAnimationFrame(left_p2);

      if (key === 68 && move_left_p2 === false && game_over === false)
         move_right_p2 = requestAnimationFrame(right_p2);
   });

   $(document).on('keyup', function (e) {
      var key = e.keyCode;
      if (key === 37) {
         cancelAnimationFrame(move_left_p1);
         move_left_p1 = false;
      }

      if (key === 39) {
         cancelAnimationFrame(move_right_p1);
         move_right_p1 = false;
      }

      if (key === 65) {
         cancelAnimationFrame(move_left_p2);
         move_left_p2 = false;
      }

      if (key === 68) {
         cancelAnimationFrame(move_right_p2)
         move_right_p2 = false;
      }
   });

   function left_p1() {
      if (parseInt(paddle_1.css('left')) > 15) {
         paddle_1.css('left', parseInt(paddle_1.css('left')) - 15);
         move_left_p1 = requestAnimationFrame(left_p1);
      }
      else {
         paddle_1.css('left', 0);
      }
   }

   function right_p1() {
      if (parseInt(paddle_1.css('left')) < (container_width - paddle_width - 15)) {
         paddle_1.css('left', parseInt(paddle_1.css('left')) + 15);
         move_right_p1 = requestAnimationFrame(right_p1);
      }
      else {
         paddle_1.css('left', (container_width - paddle_width - 2));
      }
   }

   function left_p2() {
      if (parseInt(paddle_2.css('left')) > 15) {
         paddle_2.css('left', parseInt(paddle_2.css('left')) - 15);
         move_left_p2 = requestAnimationFrame(left_p2);
      }
      else {
         paddle_2.css('left', 0);
      }
   }

   function right_p2() {
      if (parseInt(paddle_2.css('left')) < (container_width - paddle_width - 15)) {
         paddle_2.css('left', parseInt(paddle_2.css('left')) + 15);
         move_right_p2 = requestAnimationFrame(right_p2);
      }
      else {
         paddle_2.css('left', (container_width - paddle_width - 2));
      }
   }

   // ball movement

   if(game_over === true)
   {
      $(document).on('keydown', function(e){
         if(e.keyCode === 32){
            game_over = false;
            anim_id = requestAnimationFrame(repeat);
         }
      });
   }

   function repeat() {

      if (game_over === false) {
         if (collision(ball, paddle_2)) {
            bleft = parseInt(ball.css('left')) + ball_with / 2;
            pleft = parseInt(paddle_2.css('left')) + paddle_width / 2;
            ball_right_left = (bleft > pleft) ? 'right' : 'left';
            right_left_angle = Math.abs((pleft - bleft) / 7);
            ball_go = 'up';
         }
         else if (collision(ball, paddle_1)) {
            bleft = parseInt(ball.css('left')) + ball_with / 2;
            pleft = parseInt(paddle_1.css('left')) + paddle_width / 2;
            ball_right_left = (bleft > pleft) ? 'right' : 'left';
            right_left_angle = Math.abs((pleft - bleft) / 7);
            ball_go = 'down';
         }

         else if (parseInt(ball.css('left')) <= 0)
            ball_right_left = 'right';

         else if (parseInt(ball.css('left')) >= container_width - ball_with)
            ball_right_left = 'left';

         else if (parseInt(ball.css('top')) <= 0) {
            who_won = 2;
            stop_the_game();
         }

         else if (parseInt(ball.css('top')) >= (container_height - ball_height)) {
            who_won = 1;
            stop_the_game();
         }

         if (ball_go === 'down')
            ball_down();
         else if (ball_go === 'up')
            ball_up();

         anim_id = requestAnimationFrame(repeat);
      }
   }

   function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
         return false;
      return true;
   }

   function stop_the_game() {
      cancelAnimationFrame(anim_id);
      cancelAnimationFrame(move_right_p1);
      cancelAnimationFrame(move_right_p2);
      cancelAnimationFrame(move_left_p1);
      cancelAnimationFrame(move_left_p2); 
      
      game_over = true;

      $('#restart').show();

   }

   function ball_down() {
      ball.css('top', parseInt(ball.css('top')) + top_angle);
      if (ball_right_left === 'left')
         ball.css('left', parseInt(ball.css('left')) - right_left_angle);
      else
         ball.css('left', parseInt(ball.css('left')) + right_left_angle);
   }

   function ball_up() {
      ball.css('top', parseInt(ball.css('top')) - top_angle);
      if (ball_right_left === 'left')
         ball.css('left', parseInt(ball.css('left')) - right_left_angle);
      else
         ball.css('left', parseInt(ball.css('left')) + right_left_angle);
   }

});

// just checkin gthe things