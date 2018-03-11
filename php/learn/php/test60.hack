<?hh // strict
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
}