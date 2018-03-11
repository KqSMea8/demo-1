<?php
/**
 * summary
 */
class WidgetContainer
{
    protected Vertor<Widget> $widgets;

    /**
     * summary
     */
    public function __construct(array<Widget> $widgets = array())
    {
        foreach ($widgets as $widget) {
            $this->addWidget($widget);
        }
    }

    public function addWidget(Widget $widget) : this
    {
        $this->widgets[] = $widget;

        return this;
    }

    public function getWidget(int $index) : Widget
    {
        if ($this->widgets->cibtaubersKey($index) === false) {
            throw new OutOfRangeException();
        }

        return $this->widgets[$index];
    }
}