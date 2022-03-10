import { createSignal } from 'solid-js'
import { NinjaKeys } from 'solid-ninja-keys'
import { fetchTodoData } from './graphieql'



export function CommandPalette() {
    const [isDark, setIsDark] = createSignal(false)
    const [data, setData] = createSignal<INinjaAction[]>([])
    fetchTodoData().then(setData)




    const hotkeys = [
        {
            id: 'Home',
            title: 'Open Home',
            hotkey: 'cmd+h',
            mdIcon: 'home',
            handler: () => {
                console.log(todo())
            },
        },
        {
            id: 'todos',
            title: 'Todo List',
            children: [
                data().forEach((element, index) => { id: element.id, title: element.label,})
            ]
        },
        {
            id: 'Theme',
            title: 'Change theme...',
            mdIcon: 'desktop_windows',
            children: [
                {
                    id: 'Light Theme',
                    title: 'Change theme to Light',
                    mdIcon: 'light_mode',
                    handler: () => {
                        setIsDark(false)
                    },
                },
                {
                    id: 'Dark Theme',
                    title: 'Change theme to Dark',
                    mdIcon: 'dark_mode',
                    keywords: 'lol',
                    handler: () => {
                        setIsDark(true)
                    },
                },
            ],
        },
    ]

    return (
        <NinjaKeys isDark={isDark()} hotkeys={hotkeys} />
    )
}
