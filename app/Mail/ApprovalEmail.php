<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ApprovalEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $data , $emails , $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data , $emails , $content)
    {
        $this->data = $data;
        $this->emails = $emails;
        $this->content = $content;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Approval")->from("admin@tidyhome.com.au")->view('mails.approval');
    }
}
