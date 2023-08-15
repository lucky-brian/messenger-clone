interface AuthContextProps {
    children: React.ReactNode;
}

export default function AuthContext({
    children
}: AuthContextProps) {
    return { children }
}