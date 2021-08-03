<?php

namespace App\Console\Commands;

use App\CommandLogs;
use App\GiftCard;
use App\Mail\RecipientGiftCardMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class everyDay extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:everyday';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will tun every day';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $commandLogs = new CommandLogs();
        $commandLogs->save();
       $gift_cards = GiftCard::where('email_status' , 0)->get();
       if(sizeof($gift_cards) > 0){
           foreach($gift_cards as $gc){  
            $today = date("Y-m-d");
            $expire =$gc->delivery_date; //from database
            $today_time = strtotime($today);
            $expire_time = strtotime($expire);    
            if ($expire_time < $today_time){
                $giftc = GiftCard::where('id',$gc->id)->first();
                $giftc->email_status = 1;
                Mail::to($gc->recipient_email)->send(new RecipientGiftCardMail($gc));
                $giftc->save();
            }
           }
       }

    }
}
