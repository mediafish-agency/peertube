export interface HttpNodeinfoDiasporaSoftwareNsSchema20 {
    version: '2.0';
    software: {
        name: string;
        version: string;
    };
    protocols: ('activitypub' | 'buddycloud' | 'dfrn' | 'diaspora' | 'libertree' | 'ostatus' | 'pumpio' | 'tent' | 'xmpp' | 'zot')[];
    services: {
        inbound: ('atom1.0' | 'gnusocial' | 'imap' | 'pnut' | 'pop3' | 'pumpio' | 'rss2.0' | 'twitter')[];
        outbound: ('atom1.0' | 'blogger' | 'buddycloud' | 'diaspora' | 'dreamwidth' | 'drupal' | 'facebook' | 'friendica' | 'gnusocial' | 'google' | 'insanejournal' | 'libertree' | 'linkedin' | 'livejournal' | 'mediagoblin' | 'myspace' | 'pinterest' | 'pnut' | 'posterous' | 'pumpio' | 'redmatrix' | 'rss2.0' | 'smtp' | 'tent' | 'tumblr' | 'twitter' | 'wordpress' | 'xmpp')[];
    };
    openRegistrations: boolean;
    usage: {
        users: {
            total?: number;
            activeHalfyear?: number;
            activeMonth?: number;
        };
        localPosts?: number;
        localComments?: number;
    };
    metadata: {
        [k: string]: any;
    };
}
//# sourceMappingURL=nodeinfo.model.d.ts.map