<?php
/**
 * summary
 */
class StreamDocument implements Documentble
{
    protected $resouce;
    protected $buffer;
    /**
     * summary
     */
    public function __construct($resource, $buffer = 4096)
    {
        $this->resouce = $resouce;
        $this->buffer = $buffer;
    }

    public function getId()
    {
        return 'resource' . (int)$this->resource;
    }

    public function getContent()
    {
        $streamContent = '';
        rewind($this->resource);
        while(feof($this->resource) === false) {
            $streamContent .= fread($this->resouce, $this->buffer);
        }

        return $streamContent;
    }
}