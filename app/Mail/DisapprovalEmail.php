<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DisapprovalEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $data , $emails;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data , $emails)
    {
        $this->data = $data;
        $this->emails = $emails;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Disapproval")->from("admin@tidyhome.com.au")->view('mails.disapproval');
    }
}